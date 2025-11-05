import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(25, 33, 61, 0.06);
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 76px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const HeaderContent = styled.div`
  max-width: 1268px;
  width: 100%;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div`
  width: 201.602px;
  height: 67.603px;
  display: flex;
  align-items: center;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #fe1b85;
`;

export const Navigation = styled.nav`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const NavItem = styled.div`
  padding: 4px;
  cursor: pointer;
  
  a {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: #170f49;
    text-decoration: none;
    
    &:hover {
      opacity: 0.7;
    }
  }
`;

export const RightContent = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

export const Divider = styled.div`
  width: 28px;
  height: 1px;
  background: #d9dbe9;
  transform: rotate(90deg);
`;

export const UserDropdown = styled.div`
  background: #fbfbfe;
  border: 0.75px solid #f1f2f9;
  border-radius: 20px;
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 4px 3px 4px 12px;
  cursor: pointer;
  box-shadow: 0px -1px 1px 0px rgba(150, 161, 172, 0.12) inset;
  
  &:hover {
    background: #f5f5f8;
  }
`;

export const UserName = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #514f6e;
  line-height: 1.35;
`;

export const ChevronIcon = styled.span`
  font-family: 'Material Symbols Rounded';
  font-size: 14px;
  color: #6f6c8f;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20;
`;

export const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 350px;
  border: 1px solid #ffffff;
  background: #897fff;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

