import os

db_URI = os.getenv('DATABASE_URL', 'postgres://localhost:5432/golden_shoe_db')
secret = os.getenv('SECRET', 'Grass tennis pavement towel')