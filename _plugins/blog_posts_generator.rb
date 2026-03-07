require 'json'

Jekyll::Hooks.register :site, :after_init do |site|
  posts = []

  Dir.glob('_posts/*.md').each do |file|
    slug = File.basename(file, '.md')
    slug = slug.sub(/^\d{4}-\d{2}-\d{2}-/, '')

    content = File.read(file)
    frontmatter = content.split('---')[1] rescue ''

    title = 'Untitled'
    date = slug[0..9]

    frontmatter.each_line do |line|
      if line.start_with?('title:')
        title = line.sub('title:', '').strip.gsub(/^['"]|['"]$/, '')
      elsif line.start_with?('date:')
        date_part = line.sub('date:', '').strip
        date = DateTime.parse(date_part).strftime('%Y-%m-%d') rescue date_part[0..9]
      end
    end

    posts << {
      slug: slug,
      title: title,
      date: date,
      content: content
    }
  end

  posts.sort_by! { |p| p[:date] }.reverse!

  File.write('_posts.json', JSON.pretty_generate(posts))

  system('npm run build')
end
