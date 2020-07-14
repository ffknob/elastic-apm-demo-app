import { SignInInfo, User } from '@ffknob/elastic-apm-demo-shared';

export default interface AuthContext {
    user: User | null;
    isSignedIn: boolean;
    setUser: (user: User | null) => void;
    setIsSignedIn: (isSignedIn: boolean) => void;
    signIn: (signInInfo: SignInInfo) => Promise<User>;
    signOut: () => Promise<User>;
}
