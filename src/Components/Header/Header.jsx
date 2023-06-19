import './Header.scss';

import spacexlogo from '../../assets/spacex.svg';

const Header = () => {
    return(
        <header>
            <img src={spacexlogo} alt='title' />
        </header>
    )
}

export default Header;