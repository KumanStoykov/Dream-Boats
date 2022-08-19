import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
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
    const { boatId } = useParams();
    const dispatch = useDispatch();

    const [imageImageFieldIsValid, setImageFieldIsValid] = useState(false);
    const [imageFile, setImageFile] = useState([]);
    const { isLoading, requester } = useFetch();
    const boat = useSelector(state => state.allBoats.boat);

    const isEdit = pathname.includes('edit');

    useEffect(() => {
        if (isEdit) {
            const responseEdit = (data) => dispatch(boatStoreActions.addBoat(data))

            requester(boatService.getOneById(boatId), responseEdit);
        }

    }, [dispatch, requester, isEdit]);


    const makeInput = useInput(boatValidation.isLengthTwoCh);
    const modelInput = useInput(boatValidation.isLengthTwoCh);
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

    const inputFieldsIsValid = makeInput.fieldIsValid
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

        navigate(`/boat/details/${data.boat._id}`);
    };

    useEffect(() => {
        if (isEdit && boat) {
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
        } else if (!isEdit) {
            makeInput.setValue('');
            modelInput.setValue('');
            typeInput.setValue('');
            conditionInput.setValue('');
            boatLengthInput.setValue('');
            yearInput.setValue('');
            fuelInput.setValue('');
            locationInput.setValue('');
            engineMakeInput.setValue('');
            hullMaterialInput.setValue('');
            priceInput.setValue('');
            descriptionInput.setValue('');
        }
    }, [boat, isEdit, pathname, dispatch, requester]);

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
            {isLoading && <Spinner size={'large'} frame={true} />}
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
                                        data-testid='make'
                                        className={`${styles['input-field']} ${makeInput.hasError && 'error-input-field'}`}
                                        value={makeInput.value}
                                        onChange={makeInput.onChange}
                                        onBlur={makeInput.onBlur}
                                    />
                                    {makeInput.hasError && <p className={styles.error}>Make should be at least 2 characters long!</p>}

                                </div>
                                <div className={styles.field}>
                                    <label htmlFor='model'>Model</label>
                                    <input
                                        type='text'
                                        id='model'
                                        name='model'
                                        data-testid='model'
                                        className={`${styles['input-field']} ${modelInput.hasError && 'error-input-field'}`}
                                        value={modelInput.value}
                                        onChange={modelInput.onChange}
                                        onBlur={modelInput.onBlur}
                                    />
                                    {modelInput.hasError && <p className={styles.error}>Model should be at least 2 characters long!</p>}

                                </div>
                                <div className={styles.field}>
                                    <label htmlFor='type'>Type</label>
                                    <select
                                        id='type'
                                        name='type'
                                        data-testid='type'
                                        value={typeInput.value}
                                        className={`${styles['options']} ${typeInput.hasError && 'error-input-field'}`}
                                        onChange={typeInput.onChange}
                                        onBlur={typeInput.onBlur}
                                    >
                                        <option value=''></option>
                                        <option value='yacht'>Yacht</option>
                                        <option value='sailboat'>Sailboat</option>
                                        <option value='motorboat'>Motorboat</option>
                                    </select>
                                    {typeInput.hasError && <p className={styles.error}>Type is required, this field can't be empty!</p>}
                                </div>
                            </div>

                            <div className={styles['input-group-wrap']}>
                                <div className={styles.field}>
                                    <label htmlFor='condition'>Condition</label>
                                    <select
                                        id='condition'
                                        name='condition'
                                        data-testid='condition'
                                        className={`${styles['options']} ${conditionInput.hasError && 'error-input-field'}`}
                                        value={conditionInput.value}
                                        onChange={conditionInput.onChange}
                                        onBlur={conditionInput.onBlur}
                                    >
                                        <option value=''></option>
                                        <option value='old'>Old</option>
                                        <option value='new'>New</option>
                                    </select>
                                    {conditionInput.hasError && <p className={styles.error}>Condition is required, this field can't be empty!</p>}

                                </div>
                                <div className={styles.field}>
                                    <label htmlFor='boatLength'>Length</label>
                                    <input
                                        type='Number'
                                        id='boatLength'
                                        name='boatLength'
                                        data-testid='boatLength'
                                        className={`${styles['input-field']} ${boatLengthInput.hasError && 'error-input-field'}`}
                                        value={boatLengthInput.value}
                                        onChange={boatLengthInput.onChange}
                                        onBlur={boatLengthInput.onBlur}

                                    />
                                    {boatLengthInput.hasError && <p className={styles.error}>Length is required, this field can't be empty!</p>}
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor='year'>Year</label>
                                    <input
                                        type='Number'
                                        id='year'
                                        name='year'
                                        data-testid='year'
                                        className={`${styles['input-field']} ${yearInput.hasError && 'error-input-field'}`}
                                        value={yearInput.value}
                                        onChange={yearInput.onChange}
                                        onBlur={yearInput.onBlur}
                                    />
                                    {yearInput.hasError && <p className={styles.error}>Year should be between 1960 and 2022!</p>}
                                </div>
                            </div>
                            <div className={styles['input-group-wrap']}>
                                <div className={styles.field}>
                                    <label htmlFor='fuel'>Fuel</label>
                                    <select
                                        id='fuel'
                                        name='fuel'
                                        data-testid='fuel'
                                        className={`${styles['options']} ${fuelInput.hasError && 'error-input-field'}`}
                                        value={fuelInput.value}
                                        onChange={fuelInput.onChange}
                                        onBlur={fuelInput.onBlur}
                                    >
                                        <option value=''></option>
                                        <option value='petrol'>Petrol</option>
                                        <option value='diesel'>Diesel</option>
                                    </select>
                                    {fuelInput.hasError && <p className={styles.error}>Fuel is required, this field can't be empty!</p>}
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor='location'>Location</label>
                                    <input
                                        type='text'
                                        id='location'
                                        name='location'
                                        data-testid='location'
                                        className={`${styles['input-field']} ${locationInput.hasError && 'error-input-field'}`}
                                        value={locationInput.value}
                                        onChange={locationInput.onChange}
                                        onBlur={locationInput.onBlur}
                                    />
                                    {locationInput.hasError && <p className={styles.error}>Location should be at least 2 characters long!</p>}
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor='engineMake'>Engine Make</label>
                                    <input
                                        type='text'
                                        id='engineMake'
                                        name='engineMake'
                                        data-testid='engineMake'
                                        className={`${styles['input-field']} ${engineMakeInput.hasError && 'error-input-field'}`}
                                        value={engineMakeInput.value}
                                        onChange={engineMakeInput.onChange}
                                        onBlur={engineMakeInput.onBlur}
                                    />
                                    {engineMakeInput.hasError && <p className={styles.error}>Engine Make should be at least 3 characters long!</p>}
                                </div>
                            </div>
                            <div className={styles['input-group-wrap']}>
                                <div className={styles.field}>
                                    <label htmlFor='hullMaterial'>Hull Material</label>
                                    <input
                                        type='text'
                                        id='hullMaterial'
                                        name='hullMaterial'
                                        data-testid='hullMaterial'
                                        className={`${styles['input-field']} ${hullMaterialInput.hasError && 'error-input-field'}`}
                                        value={hullMaterialInput.value}
                                        onChange={hullMaterialInput.onChange}
                                        onBlur={hullMaterialInput.onBlur}
                                    />
                                    {hullMaterialInput.hasError && <p className={styles.error}>Hull Material should be at least 2 characters long!</p>}
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor='price'>Price</label>
                                    <input
                                        min={0}
                                        type='number'
                                        id='price'
                                        name='price'
                                        data-testid='price'
                                        className={`${styles['input-field']} ${priceInput.hasError && 'error-input-field'}`}
                                        value={priceInput.value}
                                        onChange={priceInput.onChange}
                                        onBlur={priceInput.onBlur}
                                    />
                                    {priceInput.hasError && <p className={styles.error}>Price is required, this field can't be empty!</p>}
                                </div>

                                <div className={`${styles.field} ${styles.image}`}>
                                    <label htmlFor='image'>Image</label>
                                    <input
                                        type='file'
                                        id='image'
                                        name='image'
                                        data-testid='image'
                                        className={`${styles['input-field']}  ${styles['file-btn']}`}
                                        multiple
                                        onChange={fileHandler}
                                    />
                                    {!isEdit
                                        && inputFieldsIsValid
                                        && !imageImageFieldIsValid
                                        && <p className={styles.error}>Image is required, this field can't be empty!</p>
                                    }
                                </div>
                            </div>

                            <div className={styles.field}>
                                <label htmlFor='description'>Description</label>
                                <textarea
                                    cols={10}
                                    rows={5}
                                    id='description'
                                    name='description'
                                    data-testid='description'
                                    className={`${styles['input-field']} ${styles['textarea']} ${descriptionInput.hasError && 'error-input-field'}`}
                                    value={descriptionInput.value}
                                    onChange={descriptionInput.onChange}
                                    onBlur={descriptionInput.onBlur}
                                />
                                {descriptionInput.hasError && <p className={styles.error}>Description should be at least 20 characters long!</p>}
                            </div>

                            <button
                                className={!inputFieldsIsValid || isLoading ? 'no-drop-btn' : 'btn-blue'}
                                disabled={!inputFieldsIsValid}
                                type='submit'
                            >
                                {isEdit ? 'Edit' : 'Create'}

                                {inputFieldsIsValid && isLoading
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