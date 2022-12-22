import './name-text.css';

import emojifyText from '../utils/emojify-text';
import states from '../utils/states';

import Avatar from './avatar';

function NameText({ account, showAvatar, showAcct, short, external }) {
  const { acct, avatar, avatarStatic, id, url, displayName, emojis } = account;
  let { username } = account;

  const displayNameWithEmoji = emojifyText(displayName, emojis);

  if (
    !short &&
    username.toLowerCase().trim() ===
      (displayName || '')
        .replace(/(\:(\w|\+|\-)+\:)(?=|[\!\.\?]|$)/g, '') // Remove shortcodes, regex from https://regex101.com/r/iE9uV0/1
        .toLowerCase()
        .trim()
  ) {
    username = null;
  }

  return (
    <a
      class={`name-text ${short ? 'short' : ''}`}
      href={url}
      target={external ? '_blank' : null}
      title={`@${acct}`}
      onClick={(e) => {
        if (external) return;
        e.preventDefault();
        states.showAccount = account;
      }}
    >
      {showAvatar && (
        <>
          <Avatar url={avatar} />{' '}
        </>
      )}
      {displayName && !short ? (
        <>
          <b
            dangerouslySetInnerHTML={{
              __html: displayNameWithEmoji,
            }}
          />
          {!showAcct && username && (
            <>
              {' '}
              <i>@{username}</i>
            </>
          )}
        </>
      ) : short ? (
        <i>@{username}</i>
      ) : (
        <b>@{username}</b>
      )}
      {showAcct && (
        <>
          <br />
          <i>@{acct}</i>
        </>
      )}
    </a>
  );
}

export default NameText;
