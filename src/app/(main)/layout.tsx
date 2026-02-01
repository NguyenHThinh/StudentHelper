import Header from "@/components/layout/Header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default MainLayout;