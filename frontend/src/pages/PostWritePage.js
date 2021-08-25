import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '../common/Button';
import ImageUpload from '../common/ImageUpload';
import addressList from '../variables/addressList';
import { writeUserData } from '../modules/Firebase';

const StyledForm = styled.form`
  margin: 10px auto 0px;
  width: 600px;
  > * {
    margin-bottom: 10px;
  }
  textarea {
    vertical-align: top;
  }
  .address_option {
    width: 100px;
    margin-right: 10px;
  }
`;

/* 글자수 제한 함수
   initialValue => textArea 초기 문자열
   validator => textArea의 문자열을 체크할 제한 함수
*/
const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    const value = event?.target?.value;
    let willUpdate = true;
    if (typeof validator === 'function') {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};

const PostWritePage = () => {
  const [date, setDate] = useState(null);
  const [files, setFiles] = useState([]); //업로드한 파일의 배열, 동시에 올린 파일끼리는 안에서 배열로 다시 묶여있다.
  const [count, setCount] = useState(0);

  const [city, setCity] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [district, setDistrict] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');

  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const review = useInput('', (value) => value.length < 300);

  function getFormatDate(date) {
    let year = date.getFullYear();
    let month = 1 + date.getMonth();
    month = month >= 10 ? month : '0' + month;
    let day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    return year + '-' + month + '-' + day;
  }

  //#region 가게 주소 select 관련 코드
  const changeCity = (e) => {
    setSelectedCity(e.target.value);
    setDistrict([
      '',
      ...addressList['sigugun'].filter((x) => x.sido === e.target.value),
    ]);
  };

  const changeDistrict = (e) => {
    setSelectedDistrict(e.target.value);
    setNeighborhood([
      '',
      ...addressList['dong'].filter(
        (x) => x.sido === selectedCity && x.sigugun === e.target.value,
      ),
    ]);
  };

  const changeNeighborhood = (e) => {
    console.log(e.target);
    setSelectedNeighborhood(e.target.value);
  };

  useEffect(() => {
    setCity(['', ...addressList['sido']]);
  }, []);
  //#endregion

  useEffect(() => {
    const date = new Date();
    setDate(getFormatDate(date));
    setValue('date', getFormatDate(date));
  }, [date]);

  useEffect(() => {}, [selectedCity]);

  const handleSubmitBtn = (data) => {
    writeUserData(data);
  };

  return (
    <React.Fragment>
      <Header />
      <main>
        <StyledForm onSubmit={handleSubmit(handleSubmitBtn)}>
          <div>
            가게명 : <input type="text" {...register('name')} required></input>
          </div>
          <div>
            주소 :{' '}
            <select
              title="select_city"
              className="address_option"
              {...register('address.city')}
              onChange={changeCity}
              value={selectedCity}
            >
              {city &&
                city.map((x, index) => {
                  return (
                    <option key={'city_' + index} value={x.sido}>
                      {x.codeNm}
                    </option>
                  );
                })}
            </select>
            <select
              className="address_option"
              {...register('address.district')}
              onChange={changeDistrict}
              value={selectedDistrict}
            >
              {district &&
                district.map((x, index) => {
                  return (
                    <option key={'district_' + index} value={x.sigugun}>
                      {x.codeNm}
                    </option>
                  );
                })}
            </select>
            <select
              className="address_option"
              {...register('address.neighborhood')}
              onChange={changeNeighborhood}
              value={selectedNeighborhood}
            >
              {neighborhood &&
                neighborhood.map((x, index) => {
                  return (
                    <option key={'neighbor_' + index} value={x.dong}>
                      {x.codeNm}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            등록일 :
            <input
              type="date"
              placeholder="yyyy-mm-dd"
              defaultValue={date}
              disabled
            ></input>
          </div>
          <div>
            리뷰(1000자 미만)
            <br />
            <textarea
              style={{ width: '100%', height: '200px' }}
              {...register('reviewText')}
              value={review.value}
              maxLength={1000}
              onChange={review.onChange}
              required
            />
          </div>
          <div
            style={{
              overflowX: 'auto',
              overflowY: 'hidden',
            }}
          >
            <ImageUpload
              files={files}
              count={count}
              setFiles={setFiles}
              setCount={setCount}
            />
          </div>
          <Button name="submit"></Button>
        </StyledForm>
      </main>
    </React.Fragment>
  );
};
export default PostWritePage;
