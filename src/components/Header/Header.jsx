import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { toPersianNumber } from "../../utils/format";

export default function Header ( { cartCount, products = [] } ) {
    const [ menuOpen, setMenuOpen ] = useState( false );
    const [ searchOpen, setSearchOpen ] = useState( false );
    const [ query, setQuery ] = useState( "" );
    const [ results, setResults ] = useState( [] );

    const location = useLocation();

    const closeSearch = () => {
        setSearchOpen( false );
        setQuery( "" );
        setResults( [] );
    };

    /* =========================
       CLOSE ON ROUTE CHANGE
    ========================= */

    useEffect( () => {
        setMenuOpen( false );
        closeSearch();
    }, [ location ] );

    /* =========================
       ESC TO CLOSE SEARCH
    ========================= */

    useEffect( () => {
        const handler = ( e ) => {
            if ( e.key === "Escape" ) {
                closeSearch();
            }
        };

        window.addEventListener( "keydown", handler );

        return () => {
            window.removeEventListener( "keydown", handler );
        };
    }, [] );

    /* =========================
       LIVE SEARCH
    ========================= */

    useEffect( () => {
        if ( !query.trim() ) {
            setResults( [] );
            return;
        }

        const timer = setTimeout( () => {
            const filtered = products.filter( ( product ) =>
                product.name
                    ?.toLowerCase()
                    .includes( query.toLowerCase() )
            );

            setResults( filtered.slice( 0, 6 ) );
        }, 300 );

        return () => clearTimeout( timer );
    }, [ query, products ] );

    return (
        <>
            <header className={ styles.header }>
                <div className={ `container ${ styles.inner }` }>
                    <Link to="/" className={ styles.logo }>
                        🏠 خانه شما
                    </Link>

                    {/* SEARCH */ }

                    <div className={ styles.searchWrapper }>
                        <SearchIcon className={ styles.searchIcon } />

                        <input
                            type="text"
                            placeholder="جستجوی محصولات"
                            value={ query }
                            onChange={ ( e ) =>
                                setQuery( e.target.value )
                            }
                            onFocus={ () =>
                                setSearchOpen( true )
                            }
                            onBlur={ () =>
                                setTimeout(
                                    () => setSearchOpen( false ),
                                    200
                                )
                            }
                        />

                        { query && (
                            <button
                                className={ styles.clearBtn }
                                onClick={ () => setQuery( "" ) }
                                type="button"
                            >
                                ×
                            </button>
                        ) }

                        { searchOpen && query && (
                            <div className={ styles.results }>
                                { results.length > 0 ? (
                                    results.map( ( item ) => (
                                        <Link
                                            key={ item._id }
                                            to={ `/products/${ item._id }` }
                                            className={
                                                styles.resultItem
                                            }
                                            onClick={ closeSearch }
                                        >
                                            { item.name }
                                        </Link>
                                    ) )
                                ) : (
                                    <div
                                        className={
                                            styles.emptyResult
                                        }
                                    >
                                        محصولی پیدا نشد
                                    </div>
                                ) }
                            </div>
                        ) }
                    </div>

                    {/* CART */ }

                    <Link
                        to="/cart"
                        className={ styles.cart }
                    >
                        🛒

                        { cartCount > 0 && (
                            <span className={ styles.badge }>
                                { toPersianNumber( cartCount ) }
                            </span>
                        ) }
                    </Link>
                </div>
            </header>

            { searchOpen && (
                <div
                    className={ styles.searchBackdrop }
                    onClick={ closeSearch }
                />
            ) }
        </>
    );
}

/* =========================
   SEARCH ICON
========================= */

function SearchIcon ( { className } ) {
    return (
        <svg
            className={ className }
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <circle cx="11" cy="11" r="7" />
            <line
                x1="20"
                y1="20"
                x2="16.5"
                y2="16.5"
            />
        </svg>
    );
}