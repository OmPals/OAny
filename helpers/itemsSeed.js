const Item = require('../models/Item')

async function seedItems () {

    let seeded = await Item.find()
    if(seeded.length > 0) return
 
    // catalogue of items
    let items = [{name: 'chips', category: 'food and beverages', addresses: ['loc1 (my address)', 'loc2 (jeff address)']}, 
                {name: 'disperin', category: 'pharmacy', addresses: ['loc2 (jeff address)', 'loc3 (buph address)']},
                {name: 'denim', category: 'lifestyle', addresses: ['loc1 (my address)', 'loc2 (jeff address)', 'loc3 (buph address)']},
                {name: 'bottle', category: 'essentials', addresses: ['loc2 (jeff address)', 'loc4 (billy address)']},
                {name: 'sizzler recipebook', category: 'books', addresses: ['loc4 (billy address)', 'loc5 (mark address)']}]
    
    await Item.insertMany(items)
}

module.exports = seedItems