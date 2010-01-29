# Provide any custom helpers that want in this module
module ApplicationHelper
	
	def lang(val)
		@lang = val
	end
	
	def lang_link(name, val)
		%(<a href="/#{val == :en ? 'index' : val.to_s}.html" class="#{val}#{' active' if val == @lang}"><span>#{name}</span></a>)
	end
	
	def description(&block)
		@content_for_description = capture(&block).gsub /<.+?>/, ""
		top(&block)
	end
	
	def frame(title, &block)
		res = %(
					<h3>#{title}</h3>
	 				<div class="frame">
	 					<div class="top"></div>
	 					<div class="main">
	 						#{capture(&block)}
	 					</div>
	 					<div class="bottom"></div>
	 				</div>
	 	)
	  # Use concat method to pass text back to the view 
	  concat(res, block.binding)
	end
	
	def top(&block)
	 		concat(content_tag(:p, capture(&block), :style => "margin-top:0"), block.binding)
	end
	def bottom(&block)
	 		concat(content_tag(:p, capture(&block), :style => "margin-bottom:0"), block.binding)
	end
	
	def reference(image, url, opts={}, &block)
		res = %(
			<div>
			<p>
			  <a href="#{url}"#{tag_options opts}><img alt="#{url}" src="img/reference/#{image}.png" /></a>
			</p>
			<p>
				#{capture(&block)}
			</p>
			</div>
		)
		 concat(res, block.binding)
	end
	
	#hax
	def tag_options(options, escape = true)
	 unless options.blank?
       attrs = []
       if escape
         options.each_pair do |key, value|
           attrs << %(#{key}="#{value}") if !value.nil?
         end
       else
         attrs = options.map { |key, value| %(#{key}="#{value}") }
       end
       " #{attrs.sort * ' '}" unless attrs.empty?
     end
   end
end