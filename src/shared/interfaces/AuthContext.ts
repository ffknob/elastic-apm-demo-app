import {
    SignInInfo,
    User,
    SocialSignInProvider
} from '@ffknob/elastic-apm-demo-shared';

export default interface AuthContext {
    user: User | null;
    isSignedIn: boolean;
    socialSignInLocation?: string;
    setUser: (user: User | null) => void;
    setIsSignedIn: (isSignedIn: boolean) => void;
    setSocialSignInLocation: (location: string) => void;
    signIn: (signInInfo: SignInInfo) => Promise<User>;
    signOut: () => Promise<User>;
    socialSignIn: (provider: SocialSignInProvider) => Promise<string>;
}
