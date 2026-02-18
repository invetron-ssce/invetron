import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (email, password) => {
        const sanitizedEmail = email.toLowerCase().trim();

        // Mock Login ONLY for Admin (Fallback)
        if (sanitizedEmail === "admin@invetron.club" && password === "admin123") {
            const mockUser = {
                email: sanitizedEmail,
                uid: "mock-admin-id",
                role: 'admin'
            };
            console.log("Mock Admin login successful");
            setCurrentUser(mockUser);
            localStorage.setItem('mockUser', JSON.stringify(mockUser)); // Persist Mock User
            return mockUser;
        }

        // Real Firebase Login for everyone else
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        localStorage.removeItem('mockUser'); // Clear Mock User
        return signOut(auth);
    };

    useEffect(() => {
        // Check for mock user first
        const storedMockUser = localStorage.getItem('mockUser');
        if (storedMockUser) {
            setCurrentUser(JSON.parse(storedMockUser));
            setLoading(false);
            return; // Skip Firebase check if mock user is present
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Assign 'coordinator' role to real Firebase users by default
                // (In a full app, you'd fetch this from Firestore: db.collection('users').doc(user.uid))
                setCurrentUser({ ...user, role: 'coordinator' });
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        }, (error) => {
            console.error("Auth error:", error);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
