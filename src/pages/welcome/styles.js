import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 40px;

  .row {
    display: flex;
    flex: 1;
    width: 100%;
    margin: 0;
  }

  form {
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .search-col {
    padding: 0;
  }
  .check-col {
    display: flex;
    align-items: flex-end;
  }
  .button-col {
    padding: 0;
    text-align: right;
  }
`;

export const EmptyContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
`;

export const ListContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;

  .card {
    color: var(--black-color);
    margin-bottom: 20px;
  }
  .card-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    margin: 0;
    padding: 0;
  }
  .card-remove {
    padding: 0;
    text-align: right;
  }
`;
