import {
    SignInInfo,
    User,
    SocialSignInProvider
} from '@ffknob/elastic-apm-demo-shared';

export default interface AuthContext {
    user: User | null;
    isSignedIn: boolean;
    socialSignInPage?: HTMLDocument;
    setUser: (user: User | null) => void;
    setIsSignedIn: (isSignedIn: boolean) => void;
    setSocialSignInPage: (page: HTMLDocument) => void;
    signIn: (signInInfo: SignInInfo) => Promise<User>;
    signOut: () => Promise<User>;
    socialSignIn: (provider: SocialSignInProvider) => Promise<HTMLDocument>;
}
