import React, {useState} from "react"
import css from './style.module.css'
import {Profile, Order, Map, Header} from '../../Components'
import { withAuth } from "../../contexts"

function Authorized(events) {
    const {logOut} = events

    const [currentPage, setPage] = useState('order')

    function clickNavItemFunc(e) {
        if(e.name === 'out') logOut()
        else setPage(e.name)
    }

    return (
        <div className={css.wrapper}>
            <Header currentPage={currentPage} clickNavItem={clickNavItemFunc}/>
            <div className={css.container}>
                {
                    currentPage === 'profile' && (
                        <div className={css.windowModal} onClick={() => setPage('order')}>
                            <div className={css.windowModalContent} onClick={(e)=> e.stopPropagation()}>
                                <Profile />
                            </div>
                        </div>
                    )
                }
                {
                    currentPage === 'order' && (
                        <div className={css.orderWrapper}>
                            <Order />
                        </div>
                    )
                }
                <div className={css.map}>
                    <Map />
                </div>
            </div>
        </div>
    )
}

export default withAuth(Authorized)