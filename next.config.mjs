/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    
    // config.module.rules.push({
    //   test: /\.(png|jpe?g|gif|svg)$/i,
    //   use: [
    //     {
    //       loader: 'file-loader',
    //       options: {
    //         name: '[path][name].[ext]',
    //       },
    //     },
    //   ],
    // });

    // config.module.rules.push(      {
    //   test: /\.(jpe?g|png|svg|gif|ico|eot|ttf|woff|woff2|mp4|pdf|webm)$/,
    //   type: 'asset',
    //   generator: {
    //     filename: 'static/chunks/[path][name].[hash][ext]'
    //   },
    // });

    return config;
  },
};

export default nextConfig;
