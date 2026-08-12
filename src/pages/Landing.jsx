import {Link} from "react-router";
import {useTranslation} from "react-i18next";

function Landing() {
    const {t} = useTranslation();
    return (
        <>
            <h1 style={{textTransform: "upperCase", textAlign: "center"}}>
                <Link to={'notes'}>{t('notes')}</Link>
            </h1>
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



