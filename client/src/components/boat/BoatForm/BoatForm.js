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


    const makeInput = useInput(boatValidation.isLengthThreeCh);
    const modelInput = useInput(boatValidation.isLengthThreeCh);
    const typeInput = useInput(boatValidation.isEmpty);
    const conditionInput = useInput(boatValidation.isEmpty);
    const boatLengthInput = useInput(boatValidation.isEmpty);
    const yearInput = useInput(boatValidation.checkYear);
    const fuelInput = useInput(boatValidation.isEmpty);
    const locationInput = useInput(boatValidation.isLengthThreeCh);
    const engineMakeInput = useInput(boatValidation.isLengthThreeCh);
    const hullMaterialInput = useInput(boatValidation.isLengthThreeCh);
    const priceInput = useInput(boatValidation.isEmpty);
    const descriptionInput = useInput(boatValidation.descriptionLength);

    const inputFieldIsValid = makeInput.fieldIsValid
        && modelInput.fieldIsValid
        && typeInput.fieldIsValid
        && conditionInput.fieldIsValid
        && boatLengthInput.fieldIsValid
        && yearInput.fieldIsValid
        && fuelInput.fieldIsValid
        && locationInput.fieldIsValid
        && engineMakeInput.fieldIsValid
        && hullMaterialInput.fieldIsValid
        && priceInput.fieldIsValid
        && descriptionInput.fieldIsValid;


    const responseData = (data) => {
        dispatch(boatStoreActions.addBoat(data));

        makeInput.fieldReset();
        modelInput.fieldReset();
        typeInput.fieldReset();
        conditionInput.fieldReset();
        boatLengthInput.fieldReset();
        yearInput.fieldReset();
        fuelInput.fieldReset();
        locationInput.fieldReset();
        engineMakeInput.fieldReset();
        hullMaterialInput.fieldReset();
        priceInput.fieldReset();
        descriptionInput.fieldReset();

        navigate(`/boat/details/${boat._id}`);
    };

    useEffect(() => {
        if (isEdit) {
            makeInput.setValue(boat.make);
            modelInput.setValue(boat.model);
            typeInput.setValue(boat.type);
            conditionInput.setValue(boat.condition);
            boatLengthInput.setValue(boat.boatLength.toString());
            yearInput.setValue(boat.year.toString());
            fuelInput.setValue(boat.fuel);
            locationInput.setValue(boat.location);
            engineMakeInput.setValue(boat.engineMake);
            hullMaterialInput.setValue(boat.hullMaterial);
            priceInput.setValue(boat.price.toString());
            descriptionInput.setValue(boat.description);
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

        formData.append('make', makeInput.value);
        formData.append('model', modelInput.value);
        formData.append('type', typeInput.value);
        formData.append('condition', conditionInput.value);
        formData.append('boatLength', boatLengthInput.value);
        formData.append('year', yearInput.value);
        formData.append('fuel', fuelInput.value);
        formData.append('location', locationInput.value);
        formData.append('engineMake', engineMakeInput.value);
        formData.append('hullMaterial', hullMaterialInput.value);
        formData.append('price', priceInput.value);
        formData.append('description', descriptionInput.value);

        if (isEdit) {
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
                                        placeholder='Polygon, Manitou....'
                                        value={makeInput.value}
                                        onChange={makeInput.onChange}
                                        onBlur={makeInput.onBlur}
                                    />
                                    {makeInput.hasError && <p className={styles.error}>The make should be at least 3 characters long</p>}

                                </div>
                                <div className={styles.field}>
                                    <label htmlFor='model'>Model</label>
                                    <input
                                        type='text'
                                        id='model'
                                        name='model'
                                        placeholder='T150, Across...'
                                        value={modelInput.value}
                                        onChange={modelInput.onChange}
                                        onBlur={modelInput.onBlur}
                                    />
                                    {modelInput.hasError && <p className={styles.error}>The make should be at least 3 characters long</p>}

                                </div>
                                <div className={styles.field}>
                                    <label htmlFor='type'>Type</label>
                                    <select
                                        name='type'
                                        id='type'
                                        className={styles.options}
                                        value={typeInput.value}
                                        onChange={typeInput.onChange}
                                        onBlur={typeInput.onBlur}
                                    >
                                        <option value=''>Please select</option>
                                        <option value='Yacht'>Yacht</option>
                                        <option value='Sailboat'>Sailboat</option>
                                        <option value='motorboat'>Motorboat</option>
                                    </select>
                                    {typeInput.hasError && <p className={styles.error}>The type should be one from Yacht, Motorboat, Sailboat</p>}
                                </div>
                            </div>

                            <div className={styles['input-group-wrap']}>
                                <div className={styles.field}>
                                    <label htmlFor='condition'>Condition</label>
                                    <select
                                        name='condition'
                                        id='condition'
                                        className={styles.options}
                                        value={conditionInput.value}
                                        onChange={conditionInput.onChange}
                                        onBlur={conditionInput.onBlur}
                                    >
                                        <option value=''>Please select</option>
                                        <option value='old'>Old</option>
                                        <option value='new'>New</option>
                                    </select>
                                    {conditionInput.hasError && <p className={styles.error}>The condition should be one from Old or New</p>}

                                </div>
                                <div className={styles.field}>
                                    <label htmlFor='boatLength'>Length</label>
                                    <input
                                        type='Number'
                                        name='boatLength'
                                        id='boatLength'
                                        placeholder='boatLength'
                                        value={boatLengthInput.value}
                                        onChange={boatLengthInput.onChange}
                                        onBlur={boatLengthInput.onBlur}

                                    />
                                    {boatLengthInput.hasError && <p className={styles.error}>A value is required, this field can't be empty</p>}
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor='year'>Year</label>
                                    <input
                                        type='Number'
                                        name='year'
                                        id='year'
                                        placeholder='Year'
                                        value={yearInput.value}
                                        onChange={yearInput.onChange}
                                        onBlur={yearInput.onBlur}
                                    />
                                    {yearInput.hasError && <p className={styles.error}>The year should be between 1960 and 2022</p>}
                                </div>
                            </div>
                            <div className={styles['input-group-wrap']}>
                                <div className={styles.field}>
                                    <label htmlFor='fuel'>Fuel</label>
                                    <select
                                        name='fuel'
                                        id='fuel'
                                        className={styles.options}
                                        value={fuelInput.value}
                                        onChange={fuelInput.onChange}
                                        onBlur={fuelInput.onBlur}
                                    >
                                        <option value=''>Please select</option>
                                        <option value='benzin'>Benzin</option>
                                        <option value='diesel'>Diesel</option>
                                    </select>
                                    {fuelInput.hasError && <p className={styles.error}>The make should be one from Benzin, Diesel</p>}
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor='location'>Location</label>
                                    <input
                                        type='text'
                                        name='location'
                                        id='location'
                                        placeholder='Italy, Netherland...'
                                        value={locationInput.value}
                                        onChange={locationInput.onChange}
                                        onBlur={locationInput.onBlur}
                                    />
                                    {locationInput.hasError && <p className={styles.error}>The location should be at least 2 characters long</p>}
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor='engineMake'>Engine Make</label>
                                    <input
                                        type='text'
                                        name='engineMake'
                                        id='engineMake'
                                        placeholder='Volvo, Mercedes...'
                                        value={engineMakeInput.value}
                                        onChange={engineMakeInput.onChange}
                                        onBlur={engineMakeInput.onBlur}
                                    />
                                    {engineMakeInput.hasError && <p className={styles.error}>The engineMake should be at least 3 characters long</p>}
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
                                        value={hullMaterialInput.value}
                                        onChange={hullMaterialInput.onChange}
                                        onBlur={hullMaterialInput.onBlur}
                                    />
                                    {hullMaterialInput.hasError && <p className={styles.error}>The hullMaterial should be at least 2 characters long</p>}
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor='price'>Price</label>
                                    <input
                                        min={0}
                                        type='number'
                                        name='price'
                                        id='price'
                                        placeholder='30,000$'
                                        value={priceInput.value}
                                        onChange={priceInput.onChange}
                                        onBlur={priceInput.onBlur}
                                    />
                                    {priceInput.hasError && <p className={styles.error}>A value is required, this field can't be empty</p>}
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
                                    value={descriptionInput.value}
                                    onChange={descriptionInput.onChange}
                                    onBlur={descriptionInput.onBlur}
                                />
                                {descriptionInput.hasError && <p className={styles.error}>The description should be at least 20 characters long</p>}
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