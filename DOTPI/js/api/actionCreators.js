export function bookmarkPost(post) {
    return { type: 'BOOK_MARK_POST', post };
}

export function unbookmarkPost(post) {
    return { type: 'UN_BOOK_MARK_POST', post };
}

export function checkingBookMarkPost(postid) {
    return { type: 'CHECKING-BOOKMARK', postid };
}