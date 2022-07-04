import {observer} from "mobx-react";
import {Input} from "reactstrap";
import {IAppProps} from "../App";

const Header = observer((props: IAppProps) => {
    return <header className='header'>
        <div className='d-flex justify-content-between align-items-center'>
            <h5 className={'m-0'}>
                Pokemon Game
            </h5>
            <span>
                <Input
                    placeholder={'Search'}
                    onChange={props.store.setSearch}
                />
            </span>
        </div>
    </header>
})

export default Header;