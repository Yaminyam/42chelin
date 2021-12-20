import { useState, useEffect } from 'react';
import history from '../hoc/history';
import styled from 'styled-components';
import StoreInfoBlock from '../block/StoreInfoBlock';
import { fetchKakaoApi } from '../lib/api/kakao';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { checkTokenVerify } from '../common/TokenVerify';

const Wrapper = styled.div`
  min-height: 100vh;
`;
const SearchInput = styled.div`
  font-family: 'Do Hyeon', sans-serif;
  position: relative;
  overflow: hidden;
  height: 58px;
  display: block;
  border-bottom: 1px solid #bcbcbc;
  justify-content: space-between;

  input {
    margin-left: 30px;
    margin-top: 5px;
    height: 40px;
    width: 80%;
    border-style: none;
  }
  input:focus {
    outline: none;
  }

  .FontAwesomeIcon {
    justify-content: space-between;
  }
`;

const StoreInfoWarp = styled.div`
  font-family: 'Do Hyeon', sans-serif;

  margin-bottom: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  display: block;
`;

const KakaoSearchPage = () => {
  const [text, setText] = useState('');
  const [searchstoreList, setSearchstoreList] = useState([]);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      SearchStoreEvent();
    }
  };

  const SearchStoreEvent = async () => {
    try {
      const res = await fetchKakaoApi(text);
      const data = res.data.body;
      setSearchstoreList(data);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const SubmitStoreData = (placeName, id) => {
    history.push({
      pathname: '/write',
      search: `?placeName=${placeName}&id=${id}`,
    });
  };
  // Todo : onchange 될때마다 계속 실행됌 아마 컴포넌트의 업데이트를 감지해서 그런듯??

  useEffect(() => {
    checkTokenVerify();
  }, []);

  return (
    <Wrapper>
      <SearchInput onKeyPress={onKeyPress}>
        <input
          type="text"
          placeholder="가게를 검색해주세요."
          onChange={onChange}
          value={text}
        />
        <FontAwesomeIcon
          icon={faSearch}
          style={{ color: 'black' }}
          size="lg"
          className="search"
          onClick={SearchStoreEvent}
        />
      </SearchInput>
      <StoreInfoWarp>
        {searchstoreList &&
          searchstoreList.map((store, idx) => (
            <StoreInfoBlock
              onClick={() => SubmitStoreData(store.place_name, store.id)}
              address={store.address_name}
              placeName={store.place_name}
              categoryName={store.category_name}
              key={idx}
            />
          ))}
      </StoreInfoWarp>
    </Wrapper>
  );
};

export default KakaoSearchPage;
