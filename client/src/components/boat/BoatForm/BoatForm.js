import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
    const { pathname } = useLocation();
    const dispatch = useDispatch();

    const [imageImageFieldIsValid, setImageFieldIsValid] = useState(false);
    const [imageFile, setImageFile] = useState([]);
    const { isLoading, requester } = useFetch();
    const boat = useSelector(state => state.allBoats.boat);

    const isEdit = pathname.endsWith('edit');

    const {
        value: makeValue,
        setValue: makeSetValue,
        hasError: makeHasError,
        fieldIsValid: makeFieldIsValid,
        onChange: makeOnChange,
        onBlur: makeOnBlur,
        reset: makeReset
    } = useInput(boatValidation.isLengthThreeCh);

    const {
        value: modelValue,
        setValue: modelSetValue,
        hasError: modelHasError,
        fieldIsValid: modelFieldIsValid,
        onChange: modelOnChange,
        onBlur: modelOnBlur,
        reset: modelReset
    } = useInput(boatValidation.isLengthThreeCh);

    const {
        value: typeValue,
        setValue: typeSetValue,
        hasError: typeHasError,
        fieldIsValid: typeFieldIsValid,
        onChange: typeOnChange,
        onBlur: typeOnBlur,
        reset: typeReset
    } = useInput(boatValidation.isEmpty);

    const {
        value: conditionValue,
        setValue: conditionSetValue,
        hasError: conditionHasError,
        fieldIsValid: conditionFieldIsValid,
        onChange: conditionOnChange,
        onBlur: conditionOnBlur,
        reset: conditionReset
    } = useInput(boatValidation.isEmpty);

    const {
        value: boatLengthValue,
        setValue: boatLengthSetValue,
        hasError: boatLengthHasError,
        fieldIsValid: boatLengthFieldIsValid,
        onChange: boatLengthOnChange,
        onBlur: boatLengthOnBlur,
        reset: boatLengthReset
    } = useInput(boatValidation.isEmpty);

    const {
        value: yearValue,
        setValue: yearSetValue,
        hasError: yearHasError,
        fieldIsValid: yearFieldIsValid,
        onChange: yearOnChange,
        onBlur: yearOnBlur,
        reset: yearReset
    } = useInput(boatValidation.checkYear);

    const {
        value: fuelValue,
        setValue: fuelSetValue,
        hasError: fuelHasError,
        fieldIsValid: fuelFieldIsValid,
        onChange: fuelOnChange,
        onBlur: fuelOnBlur,
        reset: fuelReset
    } = useInput(boatValidation.isEmpty);

    const {
        value: locationValue,
        setValue: locationSetValue,
        hasError: locationHasError,
        fieldIsValid: locationFieldIsValid,
        onChange: locationOnChange,
        onBlur: locationOnBlur,
        reset: locationReset
    } = useInput(boatValidation.isLengthThreeCh);

    const {
        value: engineMakeValue,
        setValue: engineMakeSetValue,
        hasError: engineMakeHasError,
        fieldIsValid: engineMakeFieldIsValid,
        onChange: engineMakeOnChange,
        onBlur: engineMakeOnBlur,
        reset: engineMakeReset
    } = useInput(boatValidation.isLengthThreeCh);

    const {
        value: hullMaterialValue,
        setValue: hullMaterialSetValue,
        hasError: hullMaterialHasError,
        fieldIsValid: hullMaterialFieldIsValid,
        onChange: hullMaterialOnChange,
        onBlur: hullMaterialOnBlur,
        reset: hullMaterialReset
    } = useInput(boatValidation.isLengthThreeCh);

    const {
        value: priceValue,
        setValue: priceSetValue,
        hasError: priceHasError,
        fieldIsValid: priceFieldIsValid,
        onChange: priceOnChange,
        onBlur: priceOnBlur,
        reset: priceReset
    } = useInput(boatValidation.isEmpty);

    const {
        value: descriptionValue,
        setValue: descriptionSetValue,
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
        yearReset();
        fuelReset();
        locationReset();
        engineMakeReset();
        hullMaterialReset();
        priceReset();
        descriptionReset();

        navigate(`/boat/details/${boat._id}`);
    };

    useEffect(() => {
        if (isEdit) {
            makeSetValue(boat?.make);
            modelSetValue(boat?.model);
            typeSetValue(boat?.type);
            conditionSetValue(boat?.condition);
            boatLengthSetValue(boat?.boatLength.toString());
            yearSetValue(boat?.year.toString());
            fuelSetValue(boat?.fuel);
            locationSetValue(boat?.location);
            engineMakeSetValue(boat?.engineMake);
            hullMaterialSetValue(boat?.hullMaterial);
            priceSetValue(boat?.price.toString());
            descriptionSetValue(boat?.description);
        }
    }, [boat, isEdit, pathname]);

    const fileHandler = (e) => {
        const element = e.target;
        for (const file of element.files) {
            setImageFile(state => [...state, file]);
        }

        setImageFieldIsValid(true);
    }



    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        if (imageFile) {
            for (let i = 0; i < imageFile.length; i++) {
                formData.append('image', imageFile[i]);
            }
        }

        if (!isEdit && !imageImageFieldIsValid) {
            setImageFieldIsValid(false);
            return;
        } else if (isEdit) {
            setImageFieldIsValid(true);
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

        if(isEdit) {
            requester(boatService.edit(boat._id, formData), responseData);
        } else {
            requester(boatService.create(formData), responseData);
        }

    };

    return (
        <section className={styles.create}>
            <div className={'container'}>
                <h5 className={styles['section-head']}>
                    {isEdit
                        ? <span className={styles.heading}>Edit your offer</span>
                        : <span className={styles.heading}>Create your offer</span>
                    }

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
                                    {makeHasError && <p className={styles.error}>The make should be at least 3 characters long</p>}

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
                                    {modelHasError && <p className={styles.error}>The make should be at least 3 characters long</p>}

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
                                    {typeHasError && <p className={styles.error}>The type should be one from Yacht, Motorboat, Sailboat</p>}
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
                                    {conditionHasError && <p className={styles.error}>The condition should be one from Old or New</p>}

                                </div>
                                <div className={styles.field}>
                                    <label htmlFor='boatLength'>Length</label>
                                    <input
                                        type='Number'
                                        name='boatLength'
                                        id='boatLength'
                                        placeholder='boatLength'
                                        value={boatLengthValue}
                                        onChange={boatLengthOnChange}
                                        onBlur={boatLengthOnBlur}

                                    />
                                    {boatLengthHasError && <p className={styles.error}>A value is required, this field can't be empty</p>}
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
                                    {yearHasError && <p className={styles.error}>The year should be between 1960 and 2022</p>}
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
                                    {fuelHasError && <p className={styles.error}>The make should be one from Benzin, Diesel</p>}
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
                                    {locationHasError && <p className={styles.error}>The location should be at least 2 characters long</p>}
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
                                    {engineMakeHasError && <p className={styles.error}>The engineMake should be at least 3 characters long</p>}
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
                                    {hullMaterialHasError && <p className={styles.error}>The hullMaterial should be at least 2 characters long</p>}
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
                                    {priceHasError && <p className={styles.error}>A value is required, this field can't be empty</p>}
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
                                    {!isEdit
                                        && inputFieldIsValid
                                        && !imageImageFieldIsValid
                                        && <p className={styles.error}>A value is required, this field can't be empty</p>
                                    }
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
                                {descriptionHasError && <p className={styles.error}>The description should be at least 20 characters long</p>}
                            </div>

                            <button
                                className={'btn-blue'}
                                disabled={!inputFieldIsValid}
                                type='submit'
                            >
                                Create
                                {inputFieldIsValid && isLoading
                                    ? <Spinner size={'small'} />
                                    : <span className={'dots'}><FontAwesomeIcon icon={faEllipsisH} /></span>
                                }
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BoatForm;