import { Search } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
// === styles 
import './SearchHeader.scss';

// === Action
import { setInputSearchValue, searchActualite } from '../../../Action/home';
import {useNavigate} from "react-router-dom";


const SearchHeader = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    
    const { searchValue } = useSelector((state) => state.home);

    const onChange = (e) => {
        const SearchName = e.target;
        dispatch(setInputSearchValue( SearchName.value , SearchName.name))
    }

    const PreventDefault = (e) => {
        e.preventDefault();

        if(searchValue !== '') {
            dispatch(searchActualite(searchValue))
            navigate('/search')
        }
    }

    return (
        <div className='search--wrapper'>
            <form className='search--form' onSubmit={PreventDefault}>
                <label htmlFor="search"></label>
                <input type="search" id="search" name="search" value={searchValue} onChange={onChange} placeholder='Type your text ...'/>

                <button className='search--form-button'> <Search /></button>
            </form>
        </div>
    )
}


export default SearchHeader;