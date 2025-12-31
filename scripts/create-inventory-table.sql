-- Create inventory/stocking table for medical supplies
CREATE TABLE IF NOT EXISTS inventory (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    reorder_level INTEGER NOT NULL DEFAULT 10,
    unit_price DECIMAL(10, 2) NOT NULL,
    supplier VARCHAR(100),
    last_restocked TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on category for faster lookups
CREATE INDEX IF NOT EXISTS idx_inventory_category ON inventory(category);

-- Create index on quantity for low stock alerts
CREATE INDEX IF NOT EXISTS idx_inventory_quantity ON inventory(quantity);

-- Insert sample inventory data
INSERT INTO inventory (item_name, category, quantity, reorder_level, unit_price, supplier) VALUES
('Surgical Masks', 'PPE', 500, 100, 0.50, 'Medical Supplies Co'),
('Latex Gloves', 'PPE', 1200, 200, 0.15, 'Medical Supplies Co'),
('Thermometers', 'Equipment', 45, 10, 25.00, 'Medical Equipment Inc'),
('Blood Pressure Cuff', 'Equipment', 12, 5, 150.00, 'Medical Equipment Inc'),
('Bandages (Box)', 'Supplies', 300, 50, 5.00, 'First Aid Plus'),
('Syringes (Box)', 'Supplies', 800, 100, 12.00, 'Medical Supplies Co'),
('Antiseptic Wipes', 'Supplies', 600, 75, 8.00, 'First Aid Plus'),
('Oxygen Tanks', 'Equipment', 8, 3, 200.00, 'Gas Suppliers Ltd')
ON CONFLICT DO NOTHING;
