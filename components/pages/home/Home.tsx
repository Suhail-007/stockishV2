import { View } from 'react-native';

import ConditionalRender from '../../ConditionalRender';
import PageTitle from '../../PageTitle';

import HomeSkeleton from './Home.Skeleton';
import { homeStyles } from './home.styles';

/**
 * Home page component
 *
 * @param {{ children: React.ReactNode; isLoading: boolean }} props - The component props
 * @param {React.ReactNode} props.children - The children components
 * @param {boolean} props.isLoading - Whether the page is loading
 *
 * @example
 * <Home>
 *   <Text>Hello world!</Text>
 * </Home>
 */
const Home = ({ children, isLoading }: { children: React.ReactNode; isLoading: boolean }) => {
  return (
    <View>
      <ConditionalRender
        loaded={
          <PageTitle
            containerStyles={homeStyles.pageTitleContStyle}
            showGreeting={true}
          />
        }
        condition={isLoading}
        loading={<HomeSkeleton.Greetings loading={isLoading} />}
      />

      {children}
    </View>
  );
};

export default Home;
