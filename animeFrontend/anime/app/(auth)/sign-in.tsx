import { router } from "expo-router";
import React, {useState} from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../../lib/supabase";

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const handleLogin = () => {
        // TODO: Add your email/password authentication logic
        router.push("/home");
    };

    const handleGoogleLogin = async () => {
        // TODO: Add your Google OAuth flow
        console.log("Sign in with Google");
        setLoading(true);
        setError('');
        const {error} = await supabase.auth.signInWithOAuth({
            provider: "google",

        })
        if (error) {
            setError(error.message)
            setLoading(false);
            return;
        }
    };

    {/* Forgot Password */}


    return (
        <View style={styles.container}>
        <Text style={styles.title}>Sign in to your account</Text>

        {/* Email Field */}
        <TextInput
            placeholder="Email address"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            style={styles.input}
            autoCapitalize="none"
        />

        {/* Password Field */}
        <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            style={styles.input}
        />

        {/* Sign In Button */}
        <TouchableOpacity onPress={handleLogin} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Sign In</Text>
        </TouchableOpacity>

        {/* OAuth Divider */}
        <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
        </View>

        {/* Google Button */}
        <TouchableOpacity onPress={handleGoogleLogin} style={styles.googleButton}>
            <Image
            source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Google_%22G%22_Logo.svg",
            }}
            style={styles.googleLogo}
            />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Forgot Password */}

        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#141414", // Dark background
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    title: {
        color: "#FFF",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 32,
        textAlign: "center",
    },
    input: {
        backgroundColor: "#1e1e1e",
        color: "#FFF",
        paddingHorizontal: 12,
        paddingVertical: 14,
        borderRadius: 6,
        marginBottom: 16,
    },
    primaryButton: {
        backgroundColor: "#2c6bed",
        paddingVertical: 14,
        borderRadius: 6,
        marginTop: 8,
        alignItems: "center",
    },
    primaryButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 24,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: "#333",
    },
    dividerText: {
        color: "#777",
        marginHorizontal: 10,
    },
    googleButton: {
        flexDirection: "row",
        backgroundColor: "#FFF",
        borderRadius: 6,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    googleLogo: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    googleButtonText: {
        color: "#000",
        fontWeight: "500",
        fontSize: 15,
    },
    linkText: {
        color: "#878a8c",
        fontSize: 14,
        textAlign: "center",
        marginTop: 16,
    },
});
