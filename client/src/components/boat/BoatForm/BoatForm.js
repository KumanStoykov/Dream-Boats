import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import { boatStoreActions } from '../../../store/boatStore';
import useFetch from '../../../hooks/useFetch';
import boatService from '../../../services/boatService';
import useInput from '../../../hooks/useInput';
import boatValidation from '../../../validation/boatValidation';

import Spinner from '../../ui/Spinner/Spinner';

import styles from './BoatForm.module.css';


const BoatForm = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const boat = useSelector(state => state.boat);
    const { isLoading, requester } = useFetch();
    const [imageFile, setImageFile] = useState([]);

    const {
        value: makeValue,
        hasError: makeHasError,
        fieldIsValid: makeFieldIsValid,
        onChange: makeOnChange,
        onBlur: makeOnBlur,
        reset: makeReset
    } = useInput(boatValidation.isLengthThreeCh);

    const {
        value: modelValue,
        hasError: modelHasError,
        fieldIsValid: modelFieldIsValid,
        onChange: modelOnChange,
        onBlur: modelOnBlur,
        reset: modelReset
    } = useInput(boatValidation.isLengthThreeCh);

    const {
        value: typeValue,
        hasError: typeHasError,
        fieldIsValid: typeFieldIsValid,
        onChange: typeOnChange,
        onBlur: typeOnBlur,
        reset: typeReset
    } = useInput(boatValidation.isEmpty);

    const {
        value: conditionValue,
        hasError: conditionHasError,
        fieldIsValid: conditionFieldIsValid,
        onChange: conditionOnChange,
        onBlur: conditionOnBlur,
        reset: conditionReset
    } = useInput(boatValidation.isEmpty);

    const {
        value: boatLengthValue,
        hasError: boatLengthHasError,
        fieldIsValid: boatLengthFieldIsValid,
        onChange: boatLengthOnChange,
        onBlur: boatLengthOnBlur,
        reset: boatLengthReset
    } = useInput(boatValidation.isEmpty);

    const {
        value: yearValue,
        hasError: yearHasError,
        fieldIsValid: yearFieldIsValid,
        onChange: yearOnChange,
        onBlur: yearOnBlur,
        reset: yearReset
    } = useInput(boatValidation.isLengthTwoCh);

    const {
        value: fuelValue,
        hasError: fuelHasError,
        fieldIsValid: fuelFieldIsValid,
        onChange: fuelOnChange,
        onBlur: fuelOnBlur,
        reset: fuelReset
    } = useInput(boatValidation.isEmpty);

    const {
        value: locationValue,
        hasError: locationHasError,
        fieldIsValid: locationFieldIsValid,
        onChange: locationOnChange,
        onBlur: locationOnBlur,
        reset: locationReset
    } = useInput(boatValidation.isLengthThreeCh);

    const {
        value: engineMakeValue,
        hasError: engineMakeHasError,
        fieldIsValid: engineMakeFieldIsValid,
        onChange: engineMakeOnChange,
        onBlur: engineMakeOnBlur,
        reset: engineMakeReset
    } = useInput(boatValidation.isLengthThreeCh);

    const {
        value: hullMaterialValue,
        hasError: hullMaterialHasError,
        fieldIsValid: hullMaterialFieldIsValid,
        onChange: hullMaterialOnChange,
        onBlur: hullMaterialOnBlur,
        reset: hullMaterialReset
    } = useInput(boatValidation.isLengthThreeCh);

    const {
        value: priceValue,
        hasError: priceHasError,
        fieldIsValid: priceFieldIsValid,
        onChange: priceOnChange,
        onBlur: priceOnBlur,
        reset: priceReset
    } = useInput(boatValidation.isEmpty);

    const {
        value: descriptionValue,
        hasError: descriptionHasError,
        fieldIsValid: descriptionFieldIsValid,
        onChange: descriptionOnChange,
        onBlur: descriptionOnBlur,
        reset: descriptionReset
    } = useInput(boatValidation.descriptionLength);

    const inputFieldIsValid = makeFieldIsValid
        && modelFieldIsValid
        && typeFieldIsValid
        && conditionFieldIsValid
        && boatLengthFieldIsValid
        && yearFieldIsValid
        && fuelFieldIsValid
        && locationFieldIsValid
        && engineMakeFieldIsValid
        && hullMaterialFieldIsValid
        && priceFieldIsValid
        && descriptionFieldIsValid;

    const responseData = (data) => {
        dispatch(boatStoreActions.addBoat(data));
        makeReset();
        modelReset();
        typeReset();
        conditionReset();
        boatLengthReset();
        fuelReset();
        locationReset();
        engineMakeReset();
        hullMaterialReset();
        descriptionReset();
    };

    const fileHandler = (e) => {
        const element = e.target;
        for(const file of element.files) {
            setImageFile(state => [...state, file]);
        }
    }
    console.log(imageFile)



    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        if (imageFile) {
            for(let i = 0; i < imageFile.length; i++) {
                formData.append('image', imageFile[i]);
            }
        } 

        

        formData.append('make', makeValue);
        formData.append('model', modelValue);
        formData.append('type', typeValue);
        formData.append('condition', conditionValue);
        formData.append('boatLength', boatLengthValue);
        formData.append('year', yearValue);
        formData.append('fuel', fuelValue);
        formData.append('location', locationValue);
        formData.append('engineMake', engineMakeValue);
        formData.append('hullMaterial', hullMaterialValue);
        formData.append('price', priceValue);
        formData.append('description', descriptionValue);

        requester(boatService.create(formData), responseData);

    };

    return (
        <section className={styles.create}>
            <div className={'container'}>
                <h5 className={styles['section-head']}>
                    <span className={styles.heading}>Create your offer</span>
                    <span className={styles['sub-heading']}>Discover</span>
                </h5>
                <div className={styles['create-content']}>
                    <div className={styles['container-form']}>
                        <form className={styles['create-form']} onSubmit={submitHandler}>
                            <div className={styles['input-group-wrap']}>
                                <div className={styles.field}>
                                    <label htmlFor='make'>Make</label>
                                    <input
                                        type='text'
                                        id='make'
                                        name='make'
                                        placeholder='Poligon, Manitu....'
                                        value={makeValue}
                                        onChange={makeOnChange}
                                        onBlur={makeOnBlur}
                                    />
                                    <p className={styles.error}></p>

                                </div>
                                <div className={styles.field}>
                                    <label htmlFor='model'>Model</label>
                                    <input
                                        type='text'
                                        id='model'
                                        name='model'
                                        placeholder='T150, Across...'
                                        value={modelValue}
                                        onChange={modelOnChange}
                                        onBlur={modelOnBlur}
                                    />
                                    <p className={styles.error}></p>

                                </div>
                                <div className={styles.field}>
                                    <label htmlFor='type'>Type</label>
                                    <select
                                        name='type'
                                        id='type'
                                        value={typeValue}
                                        onChange={typeOnChange}
                                        onBlur={typeOnBlur}
                                        className={styles.options}
                                    >
                                        <option value=''>Please select</option>
                                        <option value='Yacht'>Yacht</option>
                                        <option value='Sailboat'>Sailboat</option>
                                        <option value='motorboat'>Motorboat</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles['input-group-wrap']}>
                                <div className={styles.field}>
                                    <label htmlFor='condition'>Condition</label>
                                    <select
                                        name='condition'
                                        id='condition'
                                        value={conditionValue}
                                        onChange={conditionOnChange}
                                        onBlur={conditionOnBlur}
                                        className={styles.options}
                                    >
                                        <option value=''>Please select</option>
                                        <option value='old'>Old</option>
                                        <option value='new'>New</option>
                                    </select>
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor='boatLength'>Length</label>
                                    <input
                                        type='text'
                                        name='boatLength'
                                        id='boatLength'
                                        placeholder='boatLength'
                                        value={boatLengthValue}
                                        onChange={boatLengthOnChange}
                                        onBlur={boatLengthOnBlur}

                                    />
                                    <p className={styles.error}></p>

                                </div>
                                <div className={styles.field}>
                                    <label htmlFor='year'>Year</label>
                                    <input
                                        type='Number'
                                        name='year'
                                        id='year'
                                        placeholder='Year'
                                        value={yearValue}
                                        onChange={yearOnChange}
                                        onBlur={yearOnBlur}
                                    />
                                </div>
                            </div>
                            <div className={styles['input-group-wrap']}>
                                <div className={styles.field}>
                                    <label htmlFor='fuel'>Fuel</label>
                                    <select
                                        name='fuel'
                                        id='fuel'
                                        value={fuelValue}
                                        onChange={fuelOnChange}
                                        onBlur={fuelOnBlur}
                                        className={styles.options}
                                    >
                                        <option value=''>Please select</option>
                                        <option value='benzin'>Benzin</option>
                                        <option value='diesel'>Diesel</option>
                                    </select>
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor='location'>Location</label>
                                    <input
                                        type='text'
                                        name='location'
                                        id='location'
                                        placeholder='Italy, Netherland...'
                                        value={locationValue}
                                        onChange={locationOnChange}
                                        onBlur={locationOnBlur}
                                    />
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor='engineMake'>Engine Make</label>
                                    <input
                                        type='text'
                                        name='engineMake'
                                        id='engineMake'
                                        placeholder='Volvo, Mercedes...'
                                        value={engineMakeValue}
                                        onChange={engineMakeOnChange}
                                        onBlur={engineMakeOnBlur}
                                    />
                                    <p className={styles.error}></p>
                                </div>
                            </div>
                            <div className={styles['input-group-wrap']}>
                                <div className={styles.field}>
                                    <label htmlFor='hullMaterial'>Hull Material</label>
                                    <input
                                        type='text'
                                        name='hullMaterial'
                                        id='hullMaterial'
                                        placeholder='Polyester...'
                                        value={hullMaterialValue}
                                        onChange={hullMaterialOnChange}
                                        onBlur={hullMaterialOnBlur}
                                    />
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor='price'>Price</label>
                                    <input
                                        min={0}
                                        type='number'
                                        name='price'
                                        id='price'
                                        placeholder='30,000$'
                                        value={priceValue}
                                        onChange={priceOnChange}
                                        onBlur={priceOnBlur}
                                    />
                                </div>

                                <div className={`${styles.field} ${styles.image}`}>
                                    <label htmlFor='image'>Image</label>
                                    <input
                                        className={styles['file-btn']}
                                        type='file'
                                        name='image'
                                        id='image'
                                        multiple                                      
                                        onChange={fileHandler}
                                    />
                                </div>
                            </div>

                            <div className={styles.field}>
                                <label htmlFor='description'>Description</label>
                                <textarea
                                    className={styles.textarea}
                                    cols={10}
                                    rows={2}
                                    name='description'
                                    id='description'
                                    placeholder='Description'
                                    value={descriptionValue}
                                    onChange={descriptionOnChange}
                                    onBlur={descriptionOnBlur}
                                />
                            </div>

                            <button className={'btn-blue'} type='submit'>Create
                                <span className={'dots'}><FontAwesomeIcon icon={faEllipsisH} /></span>
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BoatForm;