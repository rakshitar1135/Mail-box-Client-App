import { mailActions } from '../Store/mail-slice';

export const addMail = (mail, clearInput) => {
  const senderEmail = mail.from.replace('@', '').replace('.', '');
  const receiverEmail = mail.to.replace('@', '').replace('.', '');
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://mail-box-3927d-default-rtdb.firebaseio.com//${senderEmail}.json`,
        {
          method: 'POST',
          body: JSON.stringify({...mail, read: true}),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      await fetch(
        `https://mail-box-3927d-default-rtdb.firebaseio.com//${receiverEmail}.json`,
        {
          method: 'POST',
          body: JSON.stringify({...mail, read: false}),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        dispatch(
          mailActions.add({
            id: data.name,
            ...mail,
            read: true,
          })
        );
        clearInput();
      } else {
        throw data.error;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const replaceMail = (emailUrl, loggedUserEmail) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://mail-box-3927d-default-rtdb.firebaseio.com//${emailUrl}.json`
      );

      const data = await response.json();

      if (response.ok) {
        let mailData = [];
        let unreadMessageCount = 0;

        for (let key in data) {
          mailData = [{ id: key, ...data[key] }, ...mailData];
          if(data[key].to === loggedUserEmail && data[key].read === false) {
            unreadMessageCount++;
          }
        }

        dispatch(mailActions.replace({mailData: mailData, unreadMessageCount: unreadMessageCount}));
      } else {
        throw data.error;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};