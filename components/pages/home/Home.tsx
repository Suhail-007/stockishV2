import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import ConditionalRender from '../../ConditionalRender';
import PageTitle from '../../PageTitle';

import HomeSkeleton from './Home.Skeleton';
import { homeStyles } from './home.styles';
import { pageDefaultStyles } from '../../ui/styles/PageWrapper.styles';
import useThemeColors from '../../../hooks/useThemeColors';

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
  const { colors } = useThemeColors();
  return (
    <View>
      <View>
        <LinearGradient
          style={homeStyles.headingCont}
          useAngle={true}
          angle={90}
          colors={[colors.homeHeaderColor1, colors.homeHeaderColor1, colors.homeHeaderColor2]}>
          <ConditionalRender
            condition={isLoading}
            isTrueComponent={<HomeSkeleton.Greetings />}
            isFalseComponent={
              <PageTitle
                titleProps={{
                  fontVariant: 'quicksandBold',
                  weight: '700'
                }}
                subtitleProps={{
                  fontVariant: 'quicksandSemiBold',
                  weight: '600'
                }}
                titleStyles={{ color: colors.textWhite }}
                subtitleStyles={{ color: colors.textWhite }}
                containerStyles={homeStyles.pageTitleContStyle}
                showGreeting={true}
              />
            }
          />
        </LinearGradient>
      </View>

      <View style={[pageDefaultStyles.pageWrapper, homeStyles.mainCont]}>{children}</View>
    </View>
  );
};

export default Home;
