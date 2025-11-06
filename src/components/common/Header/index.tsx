import { Link } from 'react-router-dom';
import * as S from './style';
import logoSvg from '../../../assets/logo.svg';

const Header = () => {
  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <S.Logo>
          <img src={logoSvg} alt="Roaddy Logo" />
        </S.Logo>
        
        <S.RightContent>
          <S.Navigation>
            <S.NavItem>
              <Link to="/roadmap">Roadmap</Link>
            </S.NavItem>
            <S.NavItem>
              <Link to="/feedback">Report</Link>
            </S.NavItem>
            <S.NavItem>
              <Link to="/todo">ToDo</Link>
            </S.NavItem>
          </S.Navigation>
          
          <S.Divider />
          
          <S.UserDropdown>
            <S.UserName>User</S.UserName>
            <S.ChevronIcon>expand_more</S.ChevronIcon>
            <S.Avatar>
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
                alt="User Avatar" 
              />
            </S.Avatar>
          </S.UserDropdown>
        </S.RightContent>
      </S.HeaderContent>
    </S.HeaderContainer>
  );
};

export default Header;

