<?php
/**
 * RSS2 Feed Template for displaying RSS2 Comments feed.
 *
 * @package WordPress
 */

header('Content-Type: ' . feed_content_type('rss-http') . '; charset=' . get_option('blog_charset'), true);

echo '<?xml version="1.0" encoding="'.get_option('blog_charset').'"?'.'>';

/** This action is documented in wp-includes/feed-rss2.php */
do_action( 'rss_tag_pre', 'rss2-comments' );
?>
<rss version="2.0"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
	xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns:atom="http://www.w3.org/2005/Atom"
	xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
	<?php
	/** This action is documented in wp-includes/feed-rss2.php */
	do_action( 'rss2_ns' );
	?>

	<?php
	/**
	 * Fires at the end of the RSS root to add namespaces.
	 *
	 * @since 2.8.0
	 */
	do_action( 'rss2_comments_ns' );
	?>
>
<channel>
	

<title><?php
		if ( is_singular() )
			printf( ent2ncr( __( 'Comments on: %s' ) ), get_the_title_rss() );
		elseif ( is_search() )
			printf( ent2ncr( __( 'Comments for %1$s searching on %2$s' ) ), get_bloginfo_rss( 'name' ), get_search_query() );
		else
			printf( ent2ncr( __( 'Comments for %s' ) ), get_bloginfo_rss( 'name' ) . get_wp_title_rss() );
	?></title>


	<atom:link href="<?php self_link(); ?>" rel="self" type="application/rss+xml" />
	<link><?php (is_single()) ? the_permalink_rss() : bloginfo_rss("url") ?></link>
	<description><?php bloginfo_rss("description") ?></description>
	<lastBuildDate><?php echo mysql2date('r', get_lastcommentmodified('GMT')); ?></lastBuildDate>
	<sy:updatePeriod><?php
		/** This filter is documented in wp-includes/feed-rss2.php */
		echo apply_filters( 'rss_update_period', 'hourly' );
	?></sy:updatePeriod>
	<sy:updateFrequency>
<?php
		/** This filter is documented in wp-includes/feed-rss2.php */
		echo apply_filters( 'rss_update_frequency', '1' );
	?></sy:updateFrequency>
	

<item>

	<title><?php echo $post->post_title ?></title>
	<pubDate><?php echo mysql2date('D, d M Y H:i:s +0000', $post->post_date, false); ?></pubDate>

	<id><?php echo $post->ID; ?></id>
	<name><?php echo $post->post_name; ?></name>

	<?php $content = get_extended( $post->post_content ); ?>
	<description><![CDATA[<?php echo $content['main']; ?>]]></description>

	<content:encoded><![CDATA[<?php echo $content['extended']; ?>]]></content:encoded>
	<meta_decription><?php echo get_post_meta($post->ID, 'description', true); ?>
</meta_decription>
	<meta_keywords><?php echo get_post_meta($post->ID, 'keywords', true); ?>
</meta_keywords>
	<meta_title><?php echo get_post_meta($post->ID, 'title', true); ?>
</meta_title>
</item>



<?php
	/**
	 * Fires at the end of the RSS2 comment feed header.
	 *
	 * @since 2.3.0
	 */
	do_action( 'commentsrss2_head' );

	?>

</channel>
</rss>
