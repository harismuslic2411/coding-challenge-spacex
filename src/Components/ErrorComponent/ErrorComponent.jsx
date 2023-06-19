import './ErrorComponent.scss';

const ErrorComponent = ({error, handleError}) => {
    setTimeout(() => {
        handleError();
    }, 3000);
    return(
        <div className="alert alert-danger">
            {error}
        </div>
    )
}

export default ErrorComponent;