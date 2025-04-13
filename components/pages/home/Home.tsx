import { View } from 'react-native';

import PageTitle from '../../PageTitle';
import HomeSkeleton from './Home.Skeleton';
import { homeStyles } from './home.styles';

const Home = ({ children, isLoading }: { children: React.ReactNode; isLoading: boolean }) => {
  return (
    <View>
      {isLoading && <HomeSkeleton.Greetings loading={isLoading} />}

      {!isLoading && (
        <PageTitle
          containerStyles={homeStyles.pageTitleContStyle}
          showGreeting={true}
        />
      )}

      {children}
    </View>
  );
};

export default Home;
