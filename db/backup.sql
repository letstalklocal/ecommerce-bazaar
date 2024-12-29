-- Hero banner data
INSERT INTO hero (title, subtitle, image_url) VALUES 
('Welcome to Shop Name', 'Discover our amazing collection of products', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab');

-- Categories
INSERT INTO categories (name, description, image_url) VALUES
('Electronics', 'Latest gadgets and electronic devices', 'https://images.unsplash.com/photo-1498049794561-7780e7231661'),
('Fashion', 'Trendy clothing and accessories', 'https://images.unsplash.com/photo-1445205170230-053b83016050'),
('Home & Living', 'Beautiful items for your home', 'https://images.unsplash.com/photo-1484101403633-562f891dc89a'),
('Sports', 'Equipment for all sports enthusiasts', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211');

-- Products
INSERT INTO products (name, description, price, image_url, category_id, is_popular) VALUES
('Wireless Earbuds', 'High-quality wireless earbuds with noise cancellation', 9999, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df', 1, true),
('Smart Watch', 'Feature-rich smartwatch with health tracking', 19999, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', 1, true),
('Leather Wallet', 'Genuine leather wallet with multiple compartments', 4999, 'https://images.unsplash.com/photo-1627123424574-724758594e93', 2, false),
('Running Shoes', 'Comfortable running shoes for professional athletes', 8999, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', 4, true);

-- Admin user (password is 'admin123')
INSERT INTO users (username, password) VALUES
('admin', 'c9749b8b7e42e43d0a6276df87056f50879ce937c2979502b855c0cd0f49cd77d48bbf5c5408ae62a15a5c67d54e4c48747e583f3a46072a8927cb24ae10cef0.2cb226c1dd9caf5337e021c536f8c345');