import {useTranslation} from "react-i18next";
import {Link} from "react-router";
import ReactPlayer from 'react-player';

function Landing() {
    const {t} = useTranslation();
    return (
        <>
            <h1 style={{textAlign: "center"}}>
                main page: <Link to={'notes'} style={{textTransform: "upperCase"}}>{t('notes')}</Link>
            </h1>

            <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
                <h2>React Player</h2>
                <div style={{position: 'relative', paddingTop: '56.25%'}}>
                    <ReactPlayer
                        src={"https://www.youtube.com/watch?v=6CJUQr4Vs40"}
                        controls={true}
                        playing={false}
                        width="100%"
                        height="100%"
                        style={{position: 'absolute', top: 0, left: 0}}
                        onError={(e) => console.log('Error playing media:', e)}
                    />
                </div>
            </div>

            <ul>
                <div style={{color: "red"}}>@TODO:</div>
                <li>
                    Pages:
                    <ol>
                        <li>Home</li>
                        <li>Contacts</li>
                        <li>Passwords</li>
                        <li>Account: edit, login, ...</li>
                    </ol>
                </li>
                <li>
                    Notes:
                    <ol>
                        <li>Folder structure (use buttons + menu on right mouse click)</li>
                        <li>UX styling (+ reserve space for scrolling shift when note takes more than page height)</li>
                        <li>Page builder (multiple unlimited inputs add/remove)</li>
                    </ol>
                </li>
                <li>DB (PostgeSql or MongoDB ?)</li>
                <li>
                    BE functionality:
                    <ol>
                        <li>Account</li>
                        <li>Login/Logout/Edit</li>
                        <li>Images upload, Image access restrictions</li>
                        <li>passwords hashing</li>
                        <li>contacts import from phone or card file</li>
                    </ol>
                </li>
            </ul>
        </>
    );
}

export default Landing;



