import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../common/Header';
import StoreReviewDetail from '../common/StoreReviewDetail';
import StoreReviewList from '../common/StoreReviewList';
import { getStoreDetailData } from '../lib/api/store';
import qs from 'qs';
import ImageGallery from 'react-image-gallery';
import test from '../image/15199842115a991e53d3ee3.jpg';
import test2 from '../image/15463011825c2aaefec93d1.jpg';
import test3 from '../image/15513421885c779a6cbde26.jpg';

const StoreListBlock = styled.div`
  margin-top: 3rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: flex;
`;

const ImgBlock = styled.img``;

const ImgWapper = styled.div``;

const ContentsWrapper = styled.div`
  padding-left: 10%;
  padding-right: 10%;
`;

const PostDetailPage = ({ location }) => {
  const [storeList, setstoreList] = useState('');
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const getStore = async () => {
    try {
      const res = await getStoreDetailData(query);
      setstoreList(res.data.body);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getStore();
    return () => {
      setstoreList('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const images = [
    {
      original: `${test}`,
      thumbnail: `${test}`,
      sizes: '5600px',
    },
    {
      original: `${test2}`,
      thumbnail: `${test2}`,
    },
    {
      original: `${test3}`,
      thumbnail: `${test3}`,
    },
  ];

  return (
    <>
      <Header />
      {storeList && (
        <ContentsWrapper>
          <StoreListBlock>
            <ImgWapper>
              <ImageGallery items={images} />
              {/* <ImgBlock src={testImg} alt="tmp" /> */}
            </ImgWapper>
            <StoreReviewDetail storeList={storeList} />
          </StoreListBlock>
          <StoreReviewList storeReviews={storeList.storeReviews} />
        </ContentsWrapper>
      )}
    </>
  );
};

export default PostDetailPage;
