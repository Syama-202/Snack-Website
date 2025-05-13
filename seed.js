const mongoose = require('mongoose');
    const Snack = require('./models/Snack');
    require('dotenv').config();

    const snacks = [
        {
            "title": "Medu Vada",
            "price": 50,
            "description": "Savory donut-shaped fritter made from urad dal, perfect for a crispy snack.",
            "category": "fried",
            "image": "meduvada.jpeg",
            "badge": "Bestseller"
        },
        {
            "title": "Murukku",
            "price": 80,
            "description": "Rice flour and lentil spiral snack, a```html
            "category": "fried",
            "image": "murukku.jpeg",
            "badge": ""
        },
        {
            "title": "Banana Chips",
            "price": 120,
            "description": "Thinly sliced, deep-fried banana crisps with a touch of salt.",
            "category": "fried",
            "image": "bananachips.jpeg",
            "badge": "Popular"
        },
        {
            "title": "Samosa",
            "price": 30,
            "description": "Spiced potato-filled triangular pastry, a North Indian classic.",
            "category": "fried",
            "image": "samosa.jpeg",
            "badge": ""
        },
        {
            "title": "Paneer Pakora",
            "price": 140,
            "description": "Gram flour-coated fried paneer cubes, crispy and delicious.",
            "category": "fried",
            "image": "paneerpakora.jpeg",
            "badge": ""
        },
        {
            "title": "Kachori",
            "price": 25,
            "description": "Deep-fried disc with spicy lentil or onion filling.",
            "category": "fried",
            "image": "kachori.jpeg",
            "badge": "New"
        },
        {
            "title": "Baked Thattai",
            "price": 80,
            "description": "Crisp rice flour discs baked for a healthier South Indian snack.",
            "category": "baked",
            "image": "thattai.jpeg",
            "badge": "Healthy"
        },
        {
            "title": "Baked Khakhra",
            "price": 100,
            "description": "Crisp Gujarati-style baked wheat crackers, spiced to perfection.",
            "category": "baked",
            "image": "khakra.jpeg",
            "badge": ""
        },
        {
            "title": "Ragi Chips",
            "price": 150,
            "description": "Baked finger millet chips with a spicy masala flavor, guilt-free snacking.",
            "category": "baked",
            "image": "ragichips.jpeg",
            "badge": "Healthy"
        },
        {
            "title": "Baked Samosa",
            "price": 40,
            "description": "Oven-cooked samosa with spiced potato filling, a healthier North Indian treat.",
            "category": "baked",
            "image": "bakedsamosa.jpeg",
            "badge": ""
        },
        {
            "title": "Baked Mathri",
            "price": 50,
            "description": "Spiced, flaky wheat crackers baked for a lighter North Indian snack.",
            "category": "baked",
            "image": "mathri.jpeg",
            "badge": ""
        },
        {
            "title": "Masala Breadsticks",
            "price": 65,
            "description": "North Indian masala-flavored baked breadsticks, perfect for snacking.",
            "category": "baked",
            "image": "masalabreadsticks.jpeg",
            "badge": "New"
        },
        {
            "title": "Mixture",
            "price": 45,
            "description": "Southern-style namkeen with boondi, nuts, and curry leaves.",
            "category": "namkeen",
            "image": "mixture.jpeg",
            "badge": "Popular"
        },
        {
            "title": "Omapodi",
            "price": 80,
            "description": "Spiced sev made with ajwain, a South Indian savory delight.",
            "category": "namkeen",
            "image": "omapodi.jpg",
            "badge": ""
        },
        {
            "title": "Sundal",
            "price": 50,
            "description": "Stir-fried legumes with mustard, curry leaves, and coconut.",
            "category": "namkeen",
            "image": "sundal.jpeg",
            "badge": ""
        },
        {
            "title": "Aloo Bhujia",
            "price": 20,
            "description": "Spicy potato-based sev, a classic North Indian namkeen.",
            "category": "namkeen",
            "image": "aloobhujiya.jpeg",
            "badge": "Popular"
        },
        {
            "title": "Chivda",
            "price": 85,
            "description": "Spiced poha mix with peanuts, a light and crunchy snack.",
            "category": "namkeen",
            "image": "chivda.jpeg",
            "badge": ""
        },
        {
            "title": "Moong Dal",
            "price": 40,
            "description": "Salted, fried split moong beans, a North Indian favorite.",
            "category": "namkeen",
            "image": "moongdal.jpeg",
            "badge": ""
        },
        {
            "title": "Mysore Pak",
            "price": 200,
            "description": "Ghee-rich chickpea flour sweet, a melt-in-the-mouth South Indian delight.",
            "category": "sweet",
            "image": "mysorepak.jpeg",
            "badge": "New"
        },
        {
            "title": "Adirasam",
            "price": 150,
            "description": "Deep-fried rice flour and jaggery sweet, a South Indian festive treat.",
            "category": "sweet",
            "image": "adirasam.jpeg",
            "badge": ""
        },
        {
            "title": "Kozhukattai",
            "price": 160,
            "description": "Steamed rice dumpling with sweet coconut-jaggery filling.",
            "category": "sweet",
            "image": "kozhukattai.jpeg",
            "badge": ""
        },
        {
            "title": "Jalebi",
            "price": 140,
            "description": "Syrupy deep-fried spirals, a sweet North Indian favorite.",
            "category": "sweet",
            "image": "jalebi.jpeg",
            "badge": ""
        },
        {
            "title": "Gujiya",
            "price": 160,
            "description": "Deep-fried dumpling with khoya and dry fruit, a North Indian festive sweet.",
            "category": "sweet",
            "image": "gujiya.jpeg",
            "badge": ""
        },
        {
            "title": "Besan Ladoo",
            "price": 189,
            "description": "Round sweet made from gram flour and ghee, a North Indian classic.",
            "category": "sweet",
            "image": "besan ladoo.jpeg",
            "badge": "Bestseller"
        },
        {
            "title": "Sundal Chaat",
            "price": 70,
            "description": "Chickpea or moong-based tangy South Indian salad with chutneys.",
            "category": "street",
            "image": "sundalchaat.jpeg",
            "badge": ""
        },
        {
            "title": "Idli Chaat",
            "price": 50,
            "description": "Masala-spiced cut idlis with chutneys, a South Indian street food twist.",
            "category": "street",
            "image": "idlichaat.jpeg",
            "badge": ""
        },
        {
            "title": "Vada Pav",
            "price": 50,
            "description": "Spicy potato vada in a bun, a South Indian and Mumbai favorite.",
            "category": "street",
            "image": "vadapav.jpeg",
            "badge": ""
        },
        {
            "title": "Pani Puri Kit",
            "price": 60,
            "description": "Crispy puris with spicy tamarind water and fillings for a North Indian street food experience.",
            "category": "street",
            "image": "panipuri.jpeg",
            "badge": "Popular"
        },
        {
            "title": "Aloo Tikki Chaat",
            "price": 59,
            "description": "Mashed potato patties with curd and chutneys, a North Indian street food delight.",
            "category": "street",
            "image": "alootikkichaat.jpeg",
            "badge": ""
        },
        {
            "title": "Pav Bhaji",
            "price": 55,
            "description": "Spicy mashed veggie curry with buttered buns, a North Indian street food classic.",
            "category": "street",
            "image": "pavbhaji.jpeg",
            "badge": ""
        }
    ];

    const connectDB = async () => {
      try {
        await mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
        return mongoose.connection;
      } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
      }
    };

    const seedDB = async () => {
      const conn = await connectDB();
      try {
        await Snack.deleteMany({});
        console.log('Cleared existing snacks');
        await Snack.insertMany(snacks);
        console.log('Seeded snacks successfully');
      } catch (err) {
        console.error('Error seeding database:', err);
      } finally {
        conn.close();
      }
    };

    seedDB();
