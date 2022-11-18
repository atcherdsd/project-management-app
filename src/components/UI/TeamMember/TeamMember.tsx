import { useAppSelector } from '../../../hooks/redux';
import React from 'react';
import Github from '../../../assets/github.svg';
import Linkedin from '../../../assets/linkedin.svg';
import cl from './TeamMember.module.scss';
import Artur from '../../../assets/img/avatar_Artur.jpg';
import Nikita from '../../../assets/img/avatar_Nikita.png';
import Sergey from '../../../assets/img/avatar_Sergey.jpg';
import { teamMembers } from '../../../components/pages/WelcomePage/OurTeam/ourTeamData';

const TeamMember: React.FC = (): JSX.Element => {
  const { language } = useAppSelector((state) => state.LanguageReducer);

  return (
    <>
      {teamMembers.map((item) => {
        return (
          <div className={cl.item_container} key={item.nameEn}>
            {item.nameEn === 'Artur Shvedenko' && (
              <img className={cl.photo} src={Artur} alt="Developer photo"></img>
            )}
            {item.nameEn === 'Siarhei Charniak' && (
              <img className={cl.photo} src={Sergey} alt="Developer photo"></img>
            )}
            {item.nameEn === 'Nikita Yankovsky' && (
              <img className={cl.photo} src={Nikita} alt="Developer photo"></img>
            )}
            <h4 className={cl.name}>{language === 'EN' ? item.nameEn : item.nameRu}</h4>
            <div className={cl.role}>{language === 'EN' ? item.roleEn : item.roleRu}</div>
            <ul className={cl.icons_list}>
              <li className={cl.item_icon}>
                <a
                  className={cl.github_link}
                  href={item.githubLink}
                  rel="noreferrer"
                  target="_blank"
                >
                  <img className={cl.icon} src={Github} alt="GitHub"></img>
                  <div className={cl.icon_title}>{item.githubNickname}</div>
                </a>
              </li>
              <li className={cl.item_icon}>
                <a
                  className={cl.linkedin_link}
                  href={item.linkedinLink}
                  rel="noreferrer"
                  target="_blank"
                >
                  <img className={cl.icon} src={Linkedin} alt="Linkedin"></img>
                </a>
              </li>
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default TeamMember;
