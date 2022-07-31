const EditForm = ({    
    children,
    onSubmitHandler,
    isEdit,
    classStyles
}) => {
    return(
        <>
            {isEdit
            ? <form onSubmit={onSubmitHandler} className={classStyles}>{children}</form>
            : <div className={classStyles}>{children}</div>
            }
        </>
    );
};

export default EditForm;