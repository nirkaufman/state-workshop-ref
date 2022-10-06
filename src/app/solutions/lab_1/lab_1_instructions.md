# LAB I : Post State

- This feature enable you to create a post.
- Each post goes through 4 states: DRAFT, IN_REVIEW, DECLINED, PUBLISHED
- The `publish` button should behave different - according to the current state of the post:
  - If it's DRAFT, change the status to IN_REVIEW
  - If it's APPROVED, change the status to PUBLISHED
  - If it's DECLINED, change the status to DRAFT
- The UI Should reflect the state:
  - update the status on the top right position in the header
  - if it's UNDER_REVIEW, show two buttons for approve or decline
