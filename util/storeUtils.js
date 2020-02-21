export const manageCommentReaction = (reaction, type) => {
  const op = {
    like: 'likeCount',
    unlike: 'unlikeCount',
  }

  if (type === reaction.reactionType) {
    reaction.reactionType = null
    reaction.hasReaction = false
    reaction[op[type]] += -1
  } else if (!reaction.hasReaction && !reaction.reactionType) {
    reaction.reactionType = type
    reaction.hasReaction = true
    reaction[op[type]] += 1
  } else {
    reaction.reactionType = type
    reaction.hasReaction = true
    reaction.likeCount += (type === 'like' ? 1 : -1)
    reaction.unlikeCount += (type === 'like' ? -1 : 1)
  }
}

export const noop = () => {}
