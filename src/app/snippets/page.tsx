import PageLayout from "@/components/layouts/PageLayout";

export const metadata = {
  title: "Snippets",
};

const Snippets = () => {
  return (
    <PageLayout
      title="Snippets"
      description="This page is under development. Please visit later"
    >
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6"></div>
    </PageLayout>
  );
};

export default Snippets;
