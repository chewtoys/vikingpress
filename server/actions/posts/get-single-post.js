const { autop } = require('@wordpress/autop')
const { Collection, Comment, Media, Post, User } = require('../../services/db')
const moment = require('moment')
const { render } = require('ejs')

module.exports = async function serveSinglePost (req, res) {
  let { year, month, day, slug } = req.query
  let post = await findPostByPath(`/${year}/${month}/${day}/${slug}/`)
  if (!post) {
    return res.status(404).send()
  }
  res.send(post)
}

async function findPostByPath (path) {
  let post = await Post.findOne({
    where: { path },
    include: [
      { model: Comment, as: 'Comments', where: { status: 'approved' }, attributes: ['id', 'authorName', 'content'], required: false },
      { model: Collection, as: 'Collections', attributes: ['id', 'title'] },
      { model: Media, as: 'FeaturedImage', attributes: ['altText', 'caption', 'path'], required: false },
      { model: User, as: 'Authors', attributes: ['id', 'displayName'] }
    ]
  })
  if (!post) {
    return null
  }
  let renderedPost = {
    title: post.title,
    date: {
      unformatted: post.createdAt,
      formatted: handleDate(post.createdAt)
    },
    dek: post.dek,
    authors: await handleAuthors(post.Authors),
    collections: await handleCollections(post.Collections),
    featuredImage: await handleFeaturedImage(post.FeaturedImage),
    body: await handleBody(post),
    comments: await handleComments(post.Comments)
  }
  return renderedPost
}

async function handleBody (post) {
  post.body = await handleMedia(post.body, post.media)
  post.body = autop(post.body)
  return post.body
}

async function handleCollections (collections) {
  if (!collections) {
    return null
  }
  let collectionList = []
  for (let i = 0; i < collections.length; i++) {
    collectionList.push({
      id: collections[i].id,
      title: collections[i].title
    })
  }
  return collectionList
}

async function handleComments (comments) {
  if (!comments) {
    return null
  }
  let commentList = []
  for (let i = 0; i < comments.length; i++) {
    commentList.push({
      id: comments[i].id,
      authorName: comments[i].authorName,
      content: comments[i].content
    })
  }
  return commentList
}

function handleDate (date) {
  return moment(date).format('dddd, MMMM Do YYYY')
}

async function handleFeaturedImage (featuredImage) {
  if (!featuredImage) {
    return null
  }
  return {
    altText: featuredImage.altText,
    caption: featuredImage.caption,
    path: featuredImage.path
  }
}

function handleAuthors (authorList) {
  if (authorList.length > 2) {
    let authors = ''
    for (let i = 0; i < authorList.length; i++) {
      if (i === authorList.length - 1) {
        authors += `and ${authorList[i].displayName}`
      } else {
        authors += `${authorList[i].displayName}, `
      }
    }
    return authors
  } else if (authorList.length === 2) {
    return `${authorList[0].displayName} and ${authorList[1].displayName}`
  } else {
    return authorList[0].displayName
  }
}

const imageHtmlTemplate = `<figure><img src="/media/<%= image.path %>" alt="<% typeof image.altText === 'string' ? image.altText : ''%>"><% if (typeof image.caption === 'string') { %><figcaption><%= image.caption %></figcaption><% } %></figure>`

async function handleMedia (body, media) {
  if (!media) {
    return body
  }

  if (media.type === 'embed') {
    for (let mediaIndex = 0; mediaIndex < media.list.length; mediaIndex++) {
      let mediaId = media.list[mediaIndex]
      let image = await Media.findOne({ where: { id: mediaId } }, ['id', 'path', 'altText', 'caption'])
      let imageHtml = await render(imageHtmlTemplate, { image }, { async: true })
      body = body.replace(`{{Image:${image.id}}}`, imageHtml)
    }
  }
  return body
}
