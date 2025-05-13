const axios = require('axios');
const { MongoClient } = require('mongodb');
const xml2js = require('xml2js');
const readlineSync = require('readline-sync');
const mongoose = require('mongoose')
require('dotenv').config();


const mongoURI = process.env.MONGODB_URI;
const dbName = 'reader';
let db;
let articlesCollection;

if (!mongoURI) {
    console.error('MongoDB URI not found!');
    process.exit(1);  // Exit if URI is not available
}

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);  // Exit if connection fails
    });


async function fetchAndStoreFeeds(feedUrls) {
    try {
        const promises = feedUrls.map(async (url) => {
            const response = await axios.get(url);
            const parsedData = await parseRSS(response.data);
            await storeArticles(parsedData);
        });

        await Promise.all(promises);
        console.log('Feeds successfully fetched and stored!');
    } catch (error) {
        console.error('Error fetching and storing RSS feeds:', error);
    }
}

function parseRSS(data) {
    return new Promise((resolve, reject) => {
        xml2js.parseString(data, { mergeAttrs: true }, (err, result) => {
            if (err) {
                reject('Error parsing RSS feed');
            }
            resolve(result.rss.channel[0].item);
        });
    });
}

async function storeArticles(feedItems) {
    try {
        const articles = feedItems.map(item => ({
            title: item.title[0],
            link: item.link[0],
            description: item.description[0],
            pubDate: new Date(item.pubDate[0]),
            source: item.source ? item.source[0]._ : 'Unknown',
            read: false
        }));

        await articlesCollection.insertMany(articles);
    } catch (error) {
        console.error('Error storing articles:', error);
    }
}

async function queryArticles() {
    const searchTerm = readlineSync.question('Enter a keyword to search articles: ').toLowerCase();
    const articles = await articlesCollection.find({
        $or: [
            { title: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } }
        ]
    }).toArray();

    console.log('Found articles:');
    articles.forEach((article, index) => {
        console.log(`${index + 1}. ${article.title} - ${article.link}`);
    });
}

async function markAsRead(articleId, isRead) {
    await articlesCollection.updateOne(
        { _id: articleId },
        { $set: { read: isRead } }
    );
    console.log(`Article marked as ${isRead ? 'read' : 'unread'}`);
}


async function connectToDB() {
    try {
        const client = new MongoClient(url);
        await client.connect();
        db = client.db(dbName);
        articlesCollection = db.collection('articles');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}


async function main() {
    await connectToDB();

    const feedUrls = readlineSync.question('Enter comma-separated RSS feed URLs: ').split(',');

    await fetchAndStoreFeeds(feedUrls);

    await queryArticles();

    const articleIndex = readlineSync.questionInt('Enter the article number to mark as read/unread: ') - 1;
    const articles = await articlesCollection.find({}).toArray();
    const articleId = articles[articleIndex]._id;

    const markRead = readlineSync.keyInYNStrict('Do you want to mark this article as read?');
    await markAsRead(articleId, markRead);

    process.exit();
}

main();
