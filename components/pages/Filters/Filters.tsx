import PageWrapper from '../../ui/PageWrapper';

const FiltersPage = ({ children }: { children: React.ReactNode }) => {
  return <PageWrapper.Scroll>{children}</PageWrapper.Scroll>;
};

export default FiltersPage;
