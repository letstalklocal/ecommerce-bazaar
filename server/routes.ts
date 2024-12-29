import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { db } from "@db";
import {
  products,
  categories,
  hero,
  insertProductSchema,
  insertCategorySchema,
  insertHeroSchema,
} from "@db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // Public routes
  app.get("/api/products", async (req, res) => {
    const allProducts = await db.query.products.findMany({
      with: { category: true },
    });
    res.json(allProducts);
  });

  app.get("/api/products/:id", async (req, res) => {
    const [product] = await db.query.products.findMany({
      where: eq(products.id, parseInt(req.params.id)),
      with: { category: true },
    });

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.json(product);
  });

  app.get("/api/categories", async (req, res) => {
    const allCategories = await db.query.categories.findMany({
      with: { products: true },
    });
    res.json(allCategories);
  });

  app.get("/api/categories/:id", async (req, res) => {
    const [category] = await db.query.categories.findMany({
      where: eq(categories.id, parseInt(req.params.id)),
      with: { products: true },
    });

    if (!category) {
      return res.status(404).send("Category not found");
    }

    res.json(category);
  });

  app.get("/api/hero", async (req, res) => {
    const [currentHero] = await db.select().from(hero).limit(1);
    res.json(currentHero || null);
  });

  // Protected admin routes
  function requireAuth(req: any, res: any, next: any) {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized");
    }
    next();
  }

  app.post("/api/products", requireAuth, async (req, res) => {
    const result = insertProductSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(result.error);
    }

    const product = await db.insert(products).values(result.data).returning();
    res.json(product[0]);
  });

  app.put("/api/products/:id", requireAuth, async (req, res) => {
    const result = insertProductSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(result.error);
    }

    const product = await db
      .update(products)
      .set(result.data)
      .where(eq(products.id, parseInt(req.params.id)))
      .returning();

    if (!product.length) {
      return res.status(404).send("Product not found");
    }

    res.json(product[0]);
  });

  app.delete("/api/products/:id", requireAuth, async (req, res) => {
    await db.delete(products).where(eq(products.id, parseInt(req.params.id)));
    res.status(204).end();
  });

  app.post("/api/categories", requireAuth, async (req, res) => {
    const result = insertCategorySchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(result.error);
    }

    const category = await db.insert(categories).values(result.data).returning();
    res.json(category[0]);
  });

  app.put("/api/categories/:id", requireAuth, async (req, res) => {
    const result = insertCategorySchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(result.error);
    }

    const category = await db
      .update(categories)
      .set(result.data)
      .where(eq(categories.id, parseInt(req.params.id)))
      .returning();

    if (!category.length) {
      return res.status(404).send("Category not found");
    }

    res.json(category[0]);
  });

  app.delete("/api/categories/:id", requireAuth, async (req, res) => {
    await db.delete(categories).where(eq(categories.id, parseInt(req.params.id)));
    res.status(204).end();
  });

  app.post("/api/hero", requireAuth, async (req, res) => {
    const result = insertHeroSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(result.error);
    }

    // Delete existing hero if any
    await db.delete(hero);
    
    const newHero = await db.insert(hero).values(result.data).returning();
    res.json(newHero[0]);
  });

  const httpServer = createServer(app);
  return httpServer;
}
