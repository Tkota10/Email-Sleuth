import { firestore } from './Firebase';

// Collection reference
const articlesCollection = firestore.collection('articles');

// Save article to Firestore
const saveArticle = async (url, summary) => {
  try {
    const articleRef = await articlesCollection.add({ url, summary });
    return articleRef.id;
  } catch (error) {
    console.error('Error saving article to Firestore:', error);
    return null;
  }
};

// Fetch all articles from Firestore
const fetchArticles = async () => {
  try {
    const snapshot = await articlesCollection.get();
    const articles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return articles;
  } catch (error) {
    console.error('Error fetching articles from Firestore:', error);
    return [];
  }
};
