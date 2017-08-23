export function bookmarkPost(post) {
    return { type: 'BOOK_MARK_POST', post };
}

export function unbookmarkPost(post) {
    return { type: 'UNBOOK_MARK_POST', post };
}

export function loadingConfiguration(posts) {
    return { type: 'LOAD_CONFIGURATION',posts };
}