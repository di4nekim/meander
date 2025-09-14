// Mock Firebase Implementation for Demo Mode
// This provides a fully functional demo without requiring Firebase setup

import AsyncStorage from '@react-native-async-storage/async-storage';

// Demo users for testing
const DEMO_USERS = [
  {
    uid: 'demo-user-1',
    email: 'alice@demo.com',
    displayName: 'Alice Johnson',
  },
  {
    uid: 'demo-user-2', 
    email: 'bob@demo.com',
    displayName: 'Bob Smith',
  },
  {
    uid: 'demo-user-3',
    email: 'carol@demo.com', 
    displayName: 'Carol Davis',
  }
];

// Demo posts for the forum
const DEMO_POSTS = [
  {
    id: 'post-1',
    title: 'Best cafes for studying in Paris',
    content: 'Found some amazing spots with WiFi and great coffee!',
    author: 'Alice Johnson',
    authorId: 'demo-user-1',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    likes: 12,
    tags: ['Paris', 'Study', 'Cafes']
  },
  {
    id: 'post-2', 
    title: 'Budget travel tips for Barcelona',
    content: 'How to explore Barcelona on a student budget - my experience!',
    author: 'Bob Smith',
    authorId: 'demo-user-2',
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    likes: 8,
    tags: ['Barcelona', 'Budget', 'Travel']
  }
];

// Demo chat messages
const DEMO_MESSAGES = {
  'demo-user-1demo-user-2': [
    {
      _id: '1',
      text: 'Hey! How was your trip to Barcelona?',
      createdAt: new Date(Date.now() - 3600000),
      user: {
        _id: 'demo-user-1',
        name: 'Alice Johnson',
      },
    },
    {
      _id: '2', 
      text: 'It was amazing! The architecture is incredible.',
      createdAt: new Date(Date.now() - 3000000),
      user: {
        _id: 'demo-user-2',
        name: 'Bob Smith',
      },
    }
  ]
};

// Mock Auth
class MockAuth {
  constructor() {
    this.currentUser = null;
    this.authStateListeners = [];
  }

  async signInWithEmailAndPassword(email, password) {
    // Simple demo validation
    const user = DEMO_USERS.find(u => u.email === email);
    if (user && password === 'demo123') {
      this.currentUser = user;
      await AsyncStorage.setItem('currentUser', JSON.stringify(user));
      this.notifyAuthStateChanged(user);
      return { user };
    }
    throw new Error('Invalid credentials. Use demo123 as password for any demo user.');
  }

  async createUserWithEmailAndPassword(email, password) {
    const newUser = {
      uid: `demo-user-${Date.now()}`,
      email,
      displayName: email.split('@')[0],
    };
    
    // Add to demo users (in real app this would be persisted)
    DEMO_USERS.push(newUser);
    this.currentUser = newUser;
    await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));
    this.notifyAuthStateChanged(newUser);
    return { user: newUser };
  }

  async signOut() {
    this.currentUser = null;
    await AsyncStorage.removeItem('currentUser');
    this.notifyAuthStateChanged(null);
  }

  onAuthStateChanged(callback) {
    this.authStateListeners.push(callback);
    // Check for persisted user
    this.checkPersistedUser().then(() => {
      callback(this.currentUser);
    });
    
    return () => {
      this.authStateListeners = this.authStateListeners.filter(l => l !== callback);
    };
  }

  async checkPersistedUser() {
    try {
      const userData = await AsyncStorage.getItem('currentUser');
      if (userData) {
        this.currentUser = JSON.parse(userData);
      }
    } catch (error) {
      console.log('Error checking persisted user:', error);
    }
  }

  notifyAuthStateChanged(user) {
    this.authStateListeners.forEach(callback => callback(user));
  }
}

// Mock Firestore
class MockFirestore {
  constructor() {
    this.data = {
      users: [...DEMO_USERS],
      userChats: {},
      AllPosts: [...DEMO_POSTS],
      cities: {}
    };
  }

  collection(path) {
    return new MockCollection(this.data, path);
  }

  doc(collection, docId) {
    return new MockDocument(this.data, collection, docId);
  }
}

class MockCollection {
  constructor(data, path) {
    this.data = data;
    this.path = path;
  }

  async getDocs() {
    const collectionData = this.data[this.path] || [];
    return {
      docs: collectionData.map(item => ({
        id: item.id || item.uid,
        data: () => item
      }))
    };
  }

  doc(docId) {
    return new MockDocument(this.data, this.path, docId);
  }
}

class MockDocument {
  constructor(data, collection, docId) {
    this.data = data;
    this.collection = collection;
    this.docId = docId;
  }

  async setDoc(documentData) {
    if (!this.data[this.collection]) {
      this.data[this.collection] = [];
    }
    
    // Remove existing document with same ID
    this.data[this.collection] = this.data[this.collection].filter(
      item => (item.id || item.uid) !== this.docId
    );
    
    // Add new document
    this.data[this.collection].push({ 
      id: this.docId, 
      uid: this.docId,
      ...documentData 
    });
    
    return Promise.resolve();
  }

  async getDoc() {
    const item = this.data[this.collection]?.find(
      item => (item.id || item.uid) === this.docId
    );
    
    return {
      exists: () => !!item,
      data: () => item
    };
  }
}

// Create mock instances
const mockAuth = new MockAuth();
const mockDb = new MockFirestore();

// Mock functions that match Firebase API
export const auth = mockAuth;
export const db = mockDb;

export const createUserWithEmailAndPassword = (auth, email, password) => 
  auth.createUserWithEmailAndPassword(email, password);

export const signInWithEmailAndPassword = (auth, email, password) => 
  auth.signInWithEmailAndPassword(email, password);

export const onAuthStateChanged = (auth, callback) => 
  auth.onAuthStateChanged(callback);

export const collection = (db, path) => db.collection(path);
export const getDocs = (collection) => collection.getDocs();
export const doc = (db, collection, docId) => db.doc(collection, docId);
export const setDoc = (document, data) => document.setDoc(data);

export const GoogleAuthProvider = class {
  constructor() {
    this.providerId = 'google.com';
  }
};

// Export demo data for components to use
export const DEMO_DATA = {
  users: DEMO_USERS,
  posts: DEMO_POSTS,
  messages: DEMO_MESSAGES
};
