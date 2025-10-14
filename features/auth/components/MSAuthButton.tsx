import { MICROSOFT_CLIENT_ID, MICROSOFT_TENANT_ID } from "@/utils/env";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";
import { useMsLogin } from "../auth.hooks";

WebBrowser.maybeCompleteAuthSession();

const MSAuthButton = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { isLoading } = useMsLogin(accessToken);

  const discovery = {
    authorizationEndpoint: `https://login.microsoftonline.com/${MICROSOFT_TENANT_ID}/oauth2/v2.0/authorize`,
    tokenEndpoint: `https://login.microsoftonline.com/${MICROSOFT_TENANT_ID}/oauth2/v2.0/token`,
  };

  const redirectUri = AuthSession.makeRedirectUri({
    scheme: "hcccilms",
    path: "dashboard",
  });

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: MICROSOFT_CLIENT_ID,
      redirectUri,
      scopes: ["user.read"],
    },
    discovery
  );

  const handleSignIn = async () => {
    try {
      await promptAsync();
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  useEffect(() => {
    const getTokenAndUser = async () => {
      if (response?.type === "success" && request) {
        try {
          // Properly exchange code for token
          const tokenResult = await AuthSession.exchangeCodeAsync(
            {
              clientId: MICROSOFT_CLIENT_ID,
              code: response.params.code,
              redirectUri,
              extraParams: { code_verifier: request.codeVerifier! },
            },
            discovery
          );

          if (tokenResult.accessToken) {
            setAccessToken(tokenResult.accessToken);
          } else {
            console.error("No access token returned:", tokenResult);
          }
        } catch (err) {
          console.error("Token exchange failed:", err);
        }
      }
    };

    getTokenAndUser();
  }, [response]);

  return (
    <Pressable onPress={handleSignIn} disabled={isLoading}>
      <Text>Sign in with Microsoft</Text>
    </Pressable>
  );
};

export default MSAuthButton;
