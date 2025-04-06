import { ScrollView } from 'react-native';
import { Fragment, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/store';
import SkeletonLoader from '@/components/SkeletonLoader';
import { StyleSheet } from 'react-native';
import Error from '@/components/ui/Error';
import { fetchUserDetails } from '@/features/auth';
import Home from '../../../components/pages/home/Home';

export default function Index() {
  const { loading, errorMessage } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  return (
    <ScrollView style={styles.root}>
      {errorMessage && <Error.Message msg={errorMessage} />}

      {loading && (
        <Fragment>
          <SkeletonLoader
            visible={loading}
            noOfChildren={1}
            render={(SkeletonPlaceholder) => <SkeletonPlaceholder></SkeletonPlaceholder>}></SkeletonLoader>
        </Fragment>
      )}

      {!loading && <Home />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 10,
    paddingTop: 20,
    flex: 1
  }
});
