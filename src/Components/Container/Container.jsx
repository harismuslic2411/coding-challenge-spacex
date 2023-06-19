import './Container.scss';

const Container = ({children}) => {
    return(
        <div className="app__container">
            {children}
        </div>
    )
}

export default Container;